/**
 * Wazen MongoDB Application CRUD Service.
 *
 * Exclusively executes server-side.
 * Serves as the authoritative source of truth for:
 * 1. Transactions (Income, Expenses, Savings, Refunds, Parent-Paid)
 * 2. Recurring Items
 * 3. Budgets & Savings Goals
 * 4. Assets & Valuations
 * 5. Learning Progress, Streaks, XP & Challenges
 * 6. Family Member Summaries & Permissions
 */
import { getCollection, getMongoDb } from "@/lib/mongodb.server";
import type {
  TransactionDoc,
  RecurringItemDoc,
  BudgetDoc,
  SavingsGoalDoc,
  AssetDoc,
  LearningProgressDoc,
  ChallengeProgressDoc,
  UserProfileDoc,
  FamilyRelationshipDoc,
} from "@/lib/mongodb.server";
/* ================================================================== 1. TRANSACTIONS */

export async function listTransactions(userId: string): Promise<TransactionDoc[]> {
  const col = await getCollection("transactions");
  const docs = await col
    .find({ user_id: userId })
    .sort({ occurred_on: -1, created_at: -1 })
    .toArray();

  return docs.map((d) => ({ ...d, id: d.id || d._id }));
}

export async function createTransaction(
  userId: string,
  input: {
    kind: "income" | "expense" | "saving" | "refund";
    category: string;
    merchant?: string | null | undefined;
    amount: number;
    currency: string;
    occurred_on: string;
    note?: string | null | undefined;
    payment_method?: string | null | undefined;
    goal_id?: string | null | undefined;
    paid_by_parent?: boolean | undefined;
    deducted_from_child?: boolean | undefined;
    beneficiary_user_id?: string | null | undefined;
    linked_transaction_id?: string | null | undefined;
    original_amount?: number | null | undefined;
    original_currency?: string | null | undefined;
    converted_amount?: number | null | undefined;
    exchange_rate?: number | null | undefined;
    rate_date?: string | null | undefined;
    id?: string | undefined;
  },
): Promise<TransactionDoc> {
  const col = await getCollection("transactions");
  const id = input.id || crypto.randomUUID();
  const now = new Date().toISOString();

  const doc: TransactionDoc = {
    _id: id,
    id,
    user_id: userId,
    kind: input.kind,
    category: input.category,
    merchant: input.merchant ?? null,
    amount: input.amount,
    currency: input.currency,
    occurred_on: input.occurred_on,
    note: input.note ?? null,
    payment_method: input.payment_method ?? null,
    goal_id: input.goal_id ?? null,
    paid_by_parent: input.paid_by_parent ?? false,
    deducted_from_child: input.deducted_from_child ?? false,
    beneficiary_user_id: input.beneficiary_user_id ?? null,
    linked_transaction_id: input.linked_transaction_id ?? null,
    original_amount: input.original_amount ?? null,
    original_currency: input.original_currency ?? null,
    converted_amount: input.converted_amount ?? null,
    exchange_rate: input.exchange_rate ?? null,
    rate_date: input.rate_date ?? null,
    created_at: now,
    updated_at: now,
  };

  await col.updateOne({ _id: id }, { $set: doc }, { upsert: true });
  return doc;
}

export async function updateTransaction(
  userId: string,
  id: string,
  updates: Partial<TransactionDoc>,
): Promise<TransactionDoc | null> {
  const col = await getCollection("transactions");
  const now = new Date().toISOString();

  const res = await col.findOneAndUpdate(
    { $or: [{ _id: id }, { id: id }], user_id: userId },
    {
      $set: {
        ...updates,
        updated_at: now,
      },
    },
    { returnDocument: "after" },
  );

  return res ? { ...res, id: res.id || res._id } : null;
}

export async function deleteTransaction(userId: string, id: string): Promise<boolean> {
  const col = await getCollection("transactions");
  const res = await col.deleteOne({
    $or: [{ _id: id }, { id: id }],
    user_id: userId,
  });
  return res.deletedCount > 0;
}

export async function refundTransaction(
  userId: string,
  originalTxId: string,
  reason?: string,
): Promise<TransactionDoc> {
  const col = await getCollection("transactions");
  const original = await col.findOne({
    $or: [{ _id: originalTxId }, { id: originalTxId }],
    user_id: userId,
  });
  if (!original) {
    throw new Error("Transaction not found or not owned by user.");
  }

  const refundId = crypto.randomUUID();
  const now = new Date().toISOString();

  const refundDoc: TransactionDoc = {
    _id: refundId,
    id: refundId,
    user_id: userId,
    kind: "refund",
    category: original.category,
    merchant: original.merchant,
    amount: original.amount,
    currency: original.currency,
    occurred_on: now.slice(0, 10),
    note: reason || `Refund for transaction ${originalTxId}`,
    linked_transaction_id: original._id || originalTxId,
    refunds_transaction_id: original._id || originalTxId,
    is_refund: true,
    payment_method: original.payment_method,
    created_at: now,
    updated_at: now,
  };

  await col.insertOne(refundDoc);
  await col.updateOne(
    { _id: original._id },
    { $set: { refunded_by_transaction_id: refundId, updated_at: now } },
  );

  return refundDoc;
}

export async function listParentPaidForMe(childUserId: string): Promise<TransactionDoc[]> {
  const col = await getCollection("transactions");
  const docs = await col
    .find({
      beneficiary_user_id: childUserId,
      paid_by_parent: true,
      user_id: { $ne: childUserId },
    })
    .sort({ occurred_on: -1 })
    .toArray();

  return docs.map((d) => ({ ...d, id: d.id || d._id }));
}

export async function addParentPaidExpense(
  parentUserId: string,
  input: {
    childUserId: string;
    amount: number;
    category: string;
    merchant: string | null;
    occurredOn: string;
    paymentMethod: string | null;
    currency: string;
    deductFromChild: boolean;
    note?: string | null;
    originalAmount?: number | null;
    originalCurrency?: string | null;
    convertedAmount?: number | null;
    exchangeRate?: number | null;
    rateDate?: string | null;
  },
): Promise<{ parentTx: TransactionDoc; childTx?: TransactionDoc }> {
  // Verify relationship in MongoDB
  const famCol = await getCollection("family_relationships");
  const rel = await famCol.findOne({
    parent_user_id: parentUserId,
    child_user_id: input.childUserId,
    status: "active",
  });

  // Verify permission server-side
  if (rel && rel.permissions && rel.permissions.can_fund === false) {
    throw new Error("Permission denied: You do not have funding permission for this member.");
  }

  const parentTx = await createTransaction(parentUserId, {
    kind: "expense",
    category: input.category,
    merchant: input.merchant,
    amount: input.amount,
    currency: input.currency,
    occurred_on: input.occurredOn,
    payment_method: input.paymentMethod,
    beneficiary_user_id: input.childUserId,
    paid_by_parent: true,
    deducted_from_child: input.deductFromChild,
    note: input.note,
    original_amount: input.originalAmount,
    original_currency: input.originalCurrency,
    converted_amount: input.convertedAmount,
    exchange_rate: input.exchangeRate,
    rate_date: input.rateDate,
  });

  let childTx: TransactionDoc | undefined;
  if (input.deductFromChild) {
    childTx = await createTransaction(input.childUserId, {
      kind: "expense",
      category: input.category,
      merchant: input.merchant,
      amount: input.amount,
      currency: input.currency,
      occurred_on: input.occurredOn,
      payment_method: input.paymentMethod,
      beneficiary_user_id: input.childUserId,
      paid_by_parent: true,
      deducted_from_child: true,
      linked_transaction_id: parentTx.id,
      note: input.note || "Paid by parent from your funds",
      original_amount: input.originalAmount,
      original_currency: input.originalCurrency,
      converted_amount: input.convertedAmount,
      exchange_rate: input.exchangeRate,
      rate_date: input.rateDate,
    });
  }

  return { parentTx, childTx };
}

/* ================================================================== 2. RECURRING ITEMS */

export async function listRecurringItems(
  userId: string,
  activeOnly: boolean = false,
): Promise<RecurringItemDoc[]> {
  const col = await getCollection("recurring_items");
  const filter: Record<string, unknown> = { user_id: userId };
  if (activeOnly) {
    filter["is_active"] = true;
  }

  const docs = await col.find(filter).sort({ day_of_month: 1 }).toArray();
  return docs.map((d) => ({ ...d, id: d.id || d._id }));
}

export async function saveRecurringItem(
  userId: string,
  input: {
    id?: string | undefined;
    kind: "income" | "expense" | "saving";
    name: string;
    merchant?: string | null | undefined;
    category: string;
    amount: number;
    currency: string;
    frequency: "weekly" | "monthly" | "yearly";
    day_of_month: number;
    start_date: string;
    ends_on?: string | null | undefined;
    note?: string | null | undefined;
    active: boolean;
  },
): Promise<RecurringItemDoc> {
  const col = await getCollection("recurring_items");
  const id = input.id || crypto.randomUUID();
  const now = new Date().toISOString();

  const doc: RecurringItemDoc = {
    _id: id,
    id,
    user_id: userId,
    kind: input.kind,
    name: input.name,
    merchant: input.merchant ?? null,
    category: input.category,
    amount: input.amount,
    currency: input.currency,
    frequency: input.frequency,
    day_of_month: input.day_of_month,
    start_date: input.start_date,
    ends_on: input.ends_on ?? null,
    note: input.note ?? null,
    is_active: input.active,
    created_at: now,
    updated_at: now,
  };

  await col.updateOne({ _id: id, user_id: userId }, { $set: doc }, { upsert: true });
  return doc;
}

export async function toggleRecurringItem(
  userId: string,
  id: string,
  active: boolean,
): Promise<boolean> {
  const col = await getCollection("recurring_items");
  const res = await col.updateOne(
    { $or: [{ _id: id }, { id: id }], user_id: userId },
    { $set: { is_active: active, updated_at: new Date().toISOString() } },
  );
  return res.modifiedCount > 0;
}

export async function deleteRecurringItem(userId: string, id: string): Promise<boolean> {
  const col = await getCollection("recurring_items");
  const res = await col.deleteOne({ $or: [{ _id: id }, { id: id }], user_id: userId });
  return res.deletedCount > 0;
}

/* ================================================================== 3. BUDGETS & GOALS */

export async function getMonthlyBudget(
  userId: string,
  periodMonth: string,
): Promise<BudgetDoc | null> {
  const col = await getCollection("budgets");
  const doc = await col.findOne({ user_id: userId, period_month: periodMonth });
  return doc ? { ...doc, id: doc.id || doc._id } : null;
}

export async function upsertMonthlyBudget(
  userId: string,
  periodMonth: string,
  amount: number,
  currency: string = "KWD",
): Promise<BudgetDoc> {
  const col = await getCollection("budgets");
  const now = new Date().toISOString();
  const existing = await col.findOne({ user_id: userId, period_month: periodMonth });
  const id = existing?.id || existing?._id || crypto.randomUUID();

  const doc: BudgetDoc = {
    _id: id,
    id,
    user_id: userId,
    period_month: periodMonth,
    amount,
    currency,
    created_at: existing?.created_at || now,
    updated_at: now,
  };

  await col.updateOne(
    { user_id: userId, period_month: periodMonth },
    { $set: doc },
    { upsert: true },
  );
  return doc;
}

export async function listGoals(userId: string): Promise<SavingsGoalDoc[]> {
  const col = await getCollection("savings_goals");
  const docs = await col.find({ user_id: userId }).sort({ created_at: 1 }).toArray();
  return docs.map((d) => ({ ...d, id: d.id || d._id }));
}

export async function createGoal(
  userId: string,
  input: {
    name: string;
    kind?: "goal" | "emergency_fund";
    target_amount: number;
    target_date?: string | null;
    currency?: string;
    id?: string;
  },
): Promise<SavingsGoalDoc> {
  const col = await getCollection("savings_goals");
  const id = input.id || crypto.randomUUID();
  const now = new Date().toISOString();

  const doc: SavingsGoalDoc = {
    _id: id,
    id,
    user_id: userId,
    name: input.name,
    kind: input.kind || "goal",
    target_amount: input.target_amount,
    target_date: input.target_date ?? null,
    currency: input.currency || "KWD",
    created_at: now,
    updated_at: now,
  };

  await col.updateOne({ _id: id }, { $set: doc }, { upsert: true });
  return doc;
}

export async function updateGoal(
  userId: string,
  id: string,
  updates: Partial<SavingsGoalDoc>,
): Promise<SavingsGoalDoc | null> {
  const col = await getCollection("savings_goals");
  const res = await col.findOneAndUpdate(
    { $or: [{ _id: id }, { id: id }], user_id: userId },
    { $set: { ...updates, updated_at: new Date().toISOString() } },
    { returnDocument: "after" },
  );
  return res ? { ...res, id: res.id || res._id } : null;
}

export async function deleteGoal(userId: string, id: string): Promise<boolean> {
  const col = await getCollection("savings_goals");
  const res = await col.deleteOne({ $or: [{ _id: id }, { id: id }], user_id: userId });
  return res.deletedCount > 0;
}

/* ================================================================== 4. ASSETS */

export async function listAssets(userId: string): Promise<AssetDoc[]> {
  const col = await getCollection("assets");
  const docs = await col.find({ user_id: userId }).sort({ purchase_date: 1 }).toArray();
  return docs.map((d) => ({ ...d, id: d.id || d._id }));
}

export async function listAssetValuations(
  userId: string,
): Promise<Array<{ id: string; asset_id: string; valued_on: string; unit_value: number }>> {
  const db = await getMongoDb("Wazen");
  const valCol = db.collection<{
    _id: string;
    id: string;
    asset_id: string;
    user_id: string;
    valued_on: string;
    unit_value: number;
  }>("asset_valuations");

  const docs = await valCol.find({ user_id: userId }).sort({ valued_on: 1 }).toArray();
  return docs.map((d) => ({
    id: d.id || d._id,
    asset_id: d.asset_id,
    valued_on: d.valued_on,
    unit_value: d.unit_value,
  }));
}

export async function saveAsset(
  userId: string,
  input: {
    kind: "stock" | "gold" | "silver" | "real_estate";
    name: string;
    symbol: string | null;
    currency: string;
    purchase_date: string;
    quantity: number;
    unit_cost: number;
    current_unit_value: number;
    purity: string | null;
    property_type: string | null;
    monthly_rent: number;
    holding_purpose: string | null;
    notes: string | null;
  },
  id?: string,
): Promise<string> {
  const col = await getCollection("assets");
  const db = await getMongoDb("Wazen");
  const valCol = db.collection<{
    _id: string;
    id: string;
    asset_id: string;
    user_id: string;
    valued_on: string;
    unit_value: number;
  }>("asset_valuations");

  const assetId = id || crypto.randomUUID();
  const now = new Date().toISOString();
  const today = now.slice(0, 10);

  const doc: AssetDoc = {
    _id: assetId,
    id: assetId,
    user_id: userId,
    kind: input.kind,
    name: input.name,
    symbol: input.symbol,
    quantity: input.quantity,
    unit_cost: input.unit_cost,
    current_unit_value: input.current_unit_value,
    currency: input.currency,
    purity: input.purity,
    property_type: input.property_type,
    monthly_rent: input.monthly_rent,
    purchase_date: input.purchase_date,
    notes: input.notes,
    created_at: now,
    updated_at: now,
  };

  await col.updateOne({ _id: assetId, user_id: userId }, { $set: doc }, { upsert: true });

  // Record valuation history in MongoDB
  const valId = `${assetId}_${today}`;
  await valCol.updateOne(
    { _id: valId },
    {
      $set: {
        _id: valId,
        id: valId,
        asset_id: assetId,
        user_id: userId,
        valued_on: today,
        unit_value: input.current_unit_value,
      },
    },
    { upsert: true },
  );

  return assetId;
}

export async function deleteAsset(userId: string, id: string): Promise<boolean> {
  const col = await getCollection("assets");
  const db = await getMongoDb("Wazen");
  const valCol = db.collection("asset_valuations");

  const res = await col.deleteOne({ $or: [{ _id: id }, { id: id }], user_id: userId });
  await valCol.deleteMany({ $or: [{ asset_id: id }, { asset_id: id }], user_id: userId });
  return res.deletedCount > 0;
}

/* ================================================================== 5. LEARNING */

export async function getLearningProfile(userId: string): Promise<{
  user_id: string;
  xp: number;
  current_streak: number;
  longest_streak: number;
  last_activity_on: string | null;
}> {
  const db = await getMongoDb("Wazen");
  const col = db.collection<{
    _id: string;
    user_id: string;
    xp: number;
    current_streak: number;
    longest_streak: number;
    last_activity_on: string | null;
  }>("learning_profiles");

  const doc = await col.findOne({ user_id: userId });
  if (doc) {
    return {
      user_id: doc.user_id,
      xp: doc.xp || 0,
      current_streak: doc.current_streak || 0,
      longest_streak: doc.longest_streak || 0,
      last_activity_on: doc.last_activity_on || null,
    };
  }

  return {
    user_id: userId,
    xp: 0,
    current_streak: 0,
    longest_streak: 0,
    last_activity_on: null,
  };
}

export async function listLearningProgress(userId: string): Promise<LearningProgressDoc[]> {
  const col = await getCollection("learning_progress");
  const docs = await col.find({ user_id: userId }).sort({ last_activity_at: -1 }).toArray();
  return docs.map((d) => ({ ...d, id: d.id || d._id }));
}

export async function listLearningChallenges(userId: string): Promise<ChallengeProgressDoc[]> {
  const col = await getCollection("challenges");
  const docs = await col.find({ user_id: userId }).sort({ started_on: -1 }).toArray();
  return docs.map((d) => ({ ...d, id: d.id || d._id }));
}

export async function recordLearningActivity(
  userId: string,
  activity: {
    activity_type: "lesson" | "game" | "quiz";
    activity_key: string;
    topic: string;
    score: number;
    max_score: number;
    completed: boolean;
    difficulty?: string | undefined;
    xp: number;
  },
): Promise<LearningProgressDoc> {
  const col = await getCollection("learning_progress");
  const now = new Date().toISOString();

  const existing = await col.findOne({
    user_id: userId,
    activity_type: activity.activity_type,
    activity_key: activity.activity_key,
  });

  const id = existing?.id || existing?._id || crypto.randomUUID();
  const attempts = (existing?.attempts ?? 0) + 1;
  const bestScore = Math.max(existing?.best_score ?? 0, activity.score);
  const status =
    existing?.status === "completed" || activity.completed ? "completed" : "in_progress";

  const doc: LearningProgressDoc = {
    _id: id,
    id,
    user_id: userId,
    activity_type: activity.activity_type,
    activity_key: activity.activity_key,
    topic: activity.topic,
    status,
    score: activity.score,
    best_score: bestScore,
    max_score: activity.max_score,
    attempts,
    difficulty: activity.difficulty ?? null,
    last_activity_at: now,
    created_at: existing?.created_at || now,
  };

  await col.updateOne(
    {
      user_id: userId,
      activity_type: activity.activity_type,
      activity_key: activity.activity_key,
    },
    { $set: doc },
    { upsert: true },
  );

  // Update XP and Streak in MongoDB
  if (activity.xp > 0) {
    const db = await getMongoDb("Wazen");
    const profCol = db.collection<{
      _id: string;
      user_id: string;
      xp: number;
      current_streak: number;
      longest_streak: number;
      last_activity_on: string | null;
    }>("learning_profiles");

    const prof = await profCol.findOne({ user_id: userId });
    const today = now.slice(0, 10);
    const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);

    const currentStreak =
      prof?.last_activity_on === today
        ? prof.current_streak
        : prof?.last_activity_on === yesterday
          ? (prof.current_streak || 0) + 1
          : 1;

    const longestStreak = Math.max(currentStreak, prof?.longest_streak ?? 0);
    const newXp = (prof?.xp ?? 0) + activity.xp;

    await profCol.updateOne(
      { user_id: userId },
      {
        $set: {
          _id: userId,
          user_id: userId,
          xp: newXp,
          current_streak: currentStreak,
          longest_streak: longestStreak,
          last_activity_on: today,
        },
      },
      { upsert: true },
    );
  }

  return doc;
}

export async function startLearningChallenge(
  userId: string,
  key: string,
  targetDays: number,
): Promise<ChallengeProgressDoc> {
  const col = await getCollection("challenges");
  const today = new Date().toISOString().slice(0, 10);

  const existing = await col.findOne({ user_id: userId, challenge_key: key });
  const id = existing?.id || existing?._id || crypto.randomUUID();

  const doc: ChallengeProgressDoc = {
    _id: id,
    id,
    user_id: userId,
    challenge_key: key,
    target_days: targetDays,
    days_completed: 0,
    status: "active",
    started_on: today,
    last_checkin_on: null,
    completed_on: null,
  };

  await col.updateOne({ user_id: userId, challenge_key: key }, { $set: doc }, { upsert: true });
  return doc;
}

export async function checkInLearningChallenge(
  userId: string,
  challengeId: string,
): Promise<{ success: boolean; completed: boolean; daysCompleted: number }> {
  const col = await getCollection("challenges");
  const challenge = await col.findOne({
    $or: [{ _id: challengeId }, { id: challengeId }, { challenge_key: challengeId }],
    user_id: userId,
  });
  if (!challenge) {
    throw new Error("Challenge not found or not owned by user.");
  }

  const today = new Date().toISOString().slice(0, 10);
  if (challenge.last_checkin_on === today || challenge.status === "completed") {
    return {
      success: false,
      completed: challenge.status === "completed",
      daysCompleted: challenge.days_completed,
    };
  }

  const daysCompleted = Math.min(challenge.days_completed + 1, challenge.target_days);
  const isFinished = daysCompleted >= challenge.target_days;

  await col.updateOne(
    { _id: challenge._id },
    {
      $set: {
        days_completed: daysCompleted,
        last_checkin_on: today,
        status: isFinished ? "completed" : "active",
        completed_on: isFinished ? today : null,
      },
    },
  );

  // Award XP
  const xpReward = isFinished ? 40 : 10;
  const db = await getMongoDb("Wazen");
  const profCol = db.collection<{ _id: string; user_id: string; xp: number }>("learning_profiles");
  await profCol.updateOne({ user_id: userId }, { $inc: { xp: xpReward } }, { upsert: true });

  return { success: true, completed: isFinished, daysCompleted };
}

/* ================================================================== 6. FAMILY DATA */

export async function getFamilySummary(parentUserId: string): Promise<
  Array<{
    profile: UserProfileDoc;
    canFund: boolean;
    canMonitor: boolean;
    transactions: TransactionDoc[];
    goals: SavingsGoalDoc[];
  }>
> {
  const famCol = await getCollection("family_relationships");
  const links = await famCol.find({ parent_user_id: parentUserId, status: "active" }).toArray();
  if (links.length === 0) return [];

  // Filter allowed relationships where parent has can_monitor or can_fund permission
  const allowed = links.filter((row) => {
    const p = (row.permissions ?? {}) as Record<string, unknown>;
    return (
      p["can_monitor"] === true || p["can_fund"] === true || p["can_view_transactions"] === true
    );
  });

  if (allowed.length === 0) return [];

  const childIds = allowed.map((row) => row.child_user_id);
  const profCol = await getCollection("profiles");
  const txCol = await getCollection("transactions");
  const goalCol = await getCollection("savings_goals");

  const childProfiles = await profCol.find({ user_id: { $in: childIds } }).toArray();
  const childTransactions = await txCol.find({ user_id: { $in: childIds } }).toArray();
  const childGoals = await goalCol.find({ user_id: { $in: childIds } }).toArray();

  return childProfiles
    .map((profile) => {
      const link = allowed.find((row) => row.child_user_id === profile.user_id);
      const permissions = (link?.permissions ?? {}) as Record<string, unknown>;
      return {
        profile: { ...profile, id: profile.user_id },
        canFund: permissions["can_fund"] === true || permissions["can_manage_budget"] === true,
        canMonitor:
          permissions["can_monitor"] === true || permissions["can_view_transactions"] === true,
        transactions: childTransactions
          .filter((t) => t.user_id === profile.user_id)
          .map((t) => ({ ...t, id: t.id || t._id })),
        goals: childGoals
          .filter((g) => g.user_id === profile.user_id)
          .map((g) => ({ ...g, id: g.id || g._id })),
      };
    })
    .sort((a, b) => (a.profile.full_name || "").localeCompare(b.profile.full_name || ""));
}
