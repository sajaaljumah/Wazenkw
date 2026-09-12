import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-BQCyJxoM.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { C as useProfile, E as useWazenLocale, a as cn, n as Button, s as formatDate, w as useSession } from "./button-vAj4SDK8.mjs";
import { K as RetryIcon, Q as SpinnerIcon, St as currencyName, a as AlertIcon, d as CameraIcon, g as DocumentIcon, h as DeleteIcon, k as ICON_STROKE, m as CheckIcon, rt as UploadIcon, s as AppShell, u as CURRENCIES, xt as createTransactionFn } from "./AppShell-cdoNFpBj.mjs";
import { i as EmptyState, r as DisclosurePanel, s as Panel } from "./primitives-CO_AoPcR.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/documents-Bn4nhfmk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Financial document uploads.
*
* Wazen lets people upload or photograph a receipt, invoice or contract. The
* screens, states and stored shape are complete, but no AI service is connected:
* `DocumentExtractionProvider` is the single seam where a real extraction API
* will be plugged in later. Until then extraction reports itself as unavailable
* and the person fills or corrects the fields themselves.
*/
var DOCUMENT_KINDS = [
	"receipt",
	"gold_invoice",
	"silver_invoice",
	"stock_purchase",
	"property_contract",
	"rental_contract",
	"other"
];
function emptyExtraction(currency = "KWD") {
	return {
		documentDate: null,
		vendor: null,
		category: null,
		currency,
		totalAmount: null,
		taxAmount: null,
		paymentMethod: null,
		reference: null,
		note: null,
		metalGrams: null,
		metalPurity: null,
		pricePerGram: null,
		symbol: null,
		quantity: null,
		unitPrice: null,
		propertyAddress: null,
		propertyValue: null,
		monthlyRent: null,
		contractStart: null,
		contractEnd: null,
		lineItems: []
	};
}
/** Merges a partial (future API) result onto the canonical shape. */
function mergeExtraction(base, patch) {
	return {
		...base,
		...patch ?? {}
	};
}
/** Which extracted fields each document type asks for, in display order. */
var FIELDS_BY_KIND = {
	receipt: [
		"vendor",
		"documentDate",
		"totalAmount",
		"currency",
		"category",
		"taxAmount",
		"paymentMethod",
		"reference",
		"note"
	],
	gold_invoice: [
		"vendor",
		"documentDate",
		"metalGrams",
		"metalPurity",
		"pricePerGram",
		"totalAmount",
		"currency",
		"reference",
		"note"
	],
	silver_invoice: [
		"vendor",
		"documentDate",
		"metalGrams",
		"metalPurity",
		"pricePerGram",
		"totalAmount",
		"currency",
		"reference",
		"note"
	],
	stock_purchase: [
		"vendor",
		"documentDate",
		"symbol",
		"quantity",
		"unitPrice",
		"totalAmount",
		"currency",
		"reference",
		"note"
	],
	property_contract: [
		"propertyAddress",
		"documentDate",
		"propertyValue",
		"currency",
		"contractStart",
		"contractEnd",
		"reference",
		"note"
	],
	rental_contract: [
		"propertyAddress",
		"documentDate",
		"monthlyRent",
		"currency",
		"contractStart",
		"contractEnd",
		"reference",
		"note"
	],
	other: [
		"vendor",
		"documentDate",
		"totalAmount",
		"currency",
		"category",
		"note"
	]
};
var activeProvider = {
	name: "none",
	connected: false,
	async extract() {
		return {
			status: "unavailable",
			reason: "no-extraction-provider"
		};
	}
};
function extractionProvider() {
	return activeProvider;
}
/**
* Sample values used only to preview the review screen while no extraction
* service exists. They are never presented as a real reading of a document.
*/
function sampleExtraction(kind, currency) {
	const base = emptyExtraction(currency);
	const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	switch (kind) {
		case "gold_invoice": return {
			...base,
			vendor: "Sample jeweller",
			documentDate: today,
			metalGrams: 25,
			metalPurity: "21K",
			pricePerGram: 18.5,
			totalAmount: 462.5
		};
		case "silver_invoice": return {
			...base,
			vendor: "Sample jeweller",
			documentDate: today,
			metalGrams: 500,
			metalPurity: "999",
			pricePerGram: .28,
			totalAmount: 140
		};
		case "stock_purchase": return {
			...base,
			vendor: "Sample broker",
			documentDate: today,
			symbol: "NBK",
			quantity: 500,
			unitPrice: .95,
			totalAmount: 475
		};
		case "property_contract": return {
			...base,
			propertyAddress: "Sample address",
			documentDate: today,
			propertyValue: 25e4,
			contractStart: today
		};
		case "rental_contract": return {
			...base,
			propertyAddress: "Sample address",
			documentDate: today,
			monthlyRent: 850,
			contractStart: today
		};
		case "other": return {
			...base,
			vendor: "Sample document",
			documentDate: today,
			totalAmount: 100
		};
		default: return {
			...base,
			vendor: "Sample store",
			documentDate: today,
			totalAmount: 32.75,
			category: "Groceries",
			paymentMethod: "Card"
		};
	}
}
/** Document types that should create a spending record when saved. */
function savesAsTransaction(kind) {
	return kind === "receipt" || kind === "other";
}
var BUCKET = "financial-documents";
function useDocuments() {
	const { user, loading } = useSession();
	return useQuery({
		queryKey: ["documents", user?.id],
		enabled: !loading && !!user,
		queryFn: async () => {
			const { data, error } = await supabase.from("financial_documents").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
}
function useInvalidateDocuments() {
	const queryClient = useQueryClient();
	return async () => {
		await queryClient.invalidateQueries({ queryKey: ["documents"] });
	};
}
/** Uploads the file to the user's private folder and records the document row. */
function useUploadDocument() {
	const { user } = useSession();
	const invalidate = useInvalidateDocuments();
	return useMutation({
		mutationFn: async ({ file, kind, title }) => {
			const extension = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
			const path = `${user.id}/${crypto.randomUUID()}.${extension}`;
			const upload = await supabase.storage.from(BUCKET).upload(path, file, file.type ? {
				contentType: file.type,
				upsert: false
			} : { upsert: false });
			if (upload.error) throw upload.error;
			const { data, error } = await supabase.from("financial_documents").insert({
				user_id: user.id,
				doc_type: kind,
				title,
				file_path: path,
				file_name: file.name,
				mime_type: file.type || null,
				file_size: file.size,
				status: "uploaded"
			}).select("*").single();
			if (error) throw error;
			return data;
		},
		onSuccess: invalidate
	});
}
function useUpdateDocument() {
	const invalidate = useInvalidateDocuments();
	return useMutation({
		mutationFn: async ({ id, status, extracted, extractionSource, errorMessage }) => {
			const patch = {};
			if (status) patch["status"] = status;
			if (extracted) patch["extracted"] = extracted;
			if (extractionSource) patch["extraction_source"] = extractionSource;
			if (errorMessage !== void 0) patch["error_message"] = errorMessage;
			const { error } = await supabase.from("financial_documents").update(patch).eq("id", id);
			if (error) throw error;
		},
		onSuccess: invalidate
	});
}
function useDeleteDocument() {
	const invalidate = useInvalidateDocuments();
	return useMutation({
		mutationFn: async (document) => {
			if (document.file_path) await supabase.storage.from(BUCKET).remove([document.file_path]);
			const { error } = await supabase.from("financial_documents").delete().eq("id", document.id);
			if (error) throw error;
		},
		onSuccess: invalidate
	});
}
/**
* Asks the configured extraction provider to read the document. No AI service is
* connected yet, so today this reports "unavailable" instead of inventing data.
*/
function useRequestExtraction() {
	const invalidate = useInvalidateDocuments();
	return useMutation({
		mutationFn: async (document) => {
			await supabase.from("financial_documents").update({ status: "awaiting_extraction" }).eq("id", document.id);
			return await extractionProvider().extract({
				documentId: document.id,
				kind: document.doc_type,
				filePath: document.file_path,
				mimeType: document.mime_type
			});
		},
		onSuccess: invalidate
	});
}
/**
* Saves the reviewed fields. Receipts and general documents also create a real
* spending record so the money flows through the existing calculations.
*/
function useSaveDocumentRecord() {
	const { session } = useSession();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({ document, fields }) => {
			let transactionId = null;
			if (savesAsTransaction(document.doc_type) && fields.totalAmount && fields.totalAmount > 0) transactionId = (await createTransactionFn({ data: {
				authToken: session?.access_token,
				transaction: {
					kind: "expense",
					category: fields.category || "Other",
					merchant: fields.vendor ?? null,
					amount: fields.totalAmount,
					currency: fields.currency ?? "KWD",
					occurred_on: fields.documentDate ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
					payment_method: fields.paymentMethod ?? null,
					note: fields.note ?? null
				}
			} })).id;
			const { error } = await supabase.from("financial_documents").update({
				status: "saved",
				extracted: fields,
				saved_transaction_id: transactionId,
				error_message: null
			}).eq("id", document.id);
			if (error) throw error;
		},
		onSuccess: async () => {
			await Promise.all([queryClient.invalidateQueries({ queryKey: ["documents"] }), queryClient.invalidateQueries({ queryKey: ["transactions"] })]);
		}
	});
}
var LABEL_KEY = {
	vendor: "fieldVendor",
	documentDate: "fieldDocumentDate",
	category: "fieldCategory",
	currency: "fieldCurrency",
	totalAmount: "fieldTotalAmount",
	taxAmount: "fieldTaxAmount",
	paymentMethod: "fieldPaymentMethod",
	reference: "fieldReference",
	note: "fieldNote",
	metalGrams: "fieldMetalGrams",
	metalPurity: "fieldMetalPurity",
	pricePerGram: "fieldPricePerGram",
	symbol: "fieldSymbol",
	quantity: "fieldQuantity",
	unitPrice: "fieldUnitPrice",
	propertyAddress: "fieldPropertyAddress",
	propertyValue: "fieldPropertyValue",
	monthlyRent: "fieldMonthlyRent",
	contractStart: "fieldContractStart",
	contractEnd: "fieldContractEnd"
};
var NUMBER_FIELDS = /* @__PURE__ */ new Set([
	"totalAmount",
	"taxAmount",
	"metalGrams",
	"pricePerGram",
	"quantity",
	"unitPrice",
	"propertyValue",
	"monthlyRent"
]);
var DATE_FIELDS = /* @__PURE__ */ new Set([
	"documentDate",
	"contractStart",
	"contractEnd"
]);
/**
* Editable view of the canonical extracted-field shape. A future extraction API
* fills exactly these fields, so no redesign is needed when it is connected.
*/
function ExtractedFieldsForm({ kind, fields, onChange }) {
	const { t, language } = useWazenLocale();
	const keys = FIELDS_BY_KIND[kind];
	const set = (key, value) => {
		onChange({
			...fields,
			[key]: value
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 sm:grid-cols-2",
		children: keys.map((key) => {
			const name = String(key);
			const label = t(LABEL_KEY[name] ?? name);
			if (name === "currency") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "wazen-label",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "wazen-field mt-2",
					value: fields.currency,
					onChange: (event) => set("currency", event.target.value),
					children: CURRENCIES.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: option.code,
						children: [
							option.code,
							" — ",
							currencyName(option.code, language)
						]
					}, option.code))
				})]
			}, name);
			const value = fields[key];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "wazen-label",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "wazen-field mt-2",
					type: NUMBER_FIELDS.has(name) ? "number" : DATE_FIELDS.has(name) ? "date" : "text",
					step: NUMBER_FIELDS.has(name) ? "0.001" : void 0,
					value: value === null || value === void 0 ? "" : String(value),
					onChange: (event) => {
						const raw = event.target.value;
						if (NUMBER_FIELDS.has(name)) set(key, raw === "" ? null : Number(raw));
						else set(key, raw === "" ? null : raw);
					}
				})]
			}, name);
		})
	});
}
var KIND_KEY = {
	receipt: "docReceipt",
	gold_invoice: "docGold",
	silver_invoice: "docSilver",
	stock_purchase: "docStock",
	property_contract: "docProperty",
	rental_contract: "docRental",
	other: "docOther"
};
var STATUS_KEY = {
	uploaded: "docStatusUploaded",
	awaiting_extraction: "docStatusAwaiting",
	review: "docStatusReview",
	saved: "docStatusSaved",
	failed: "docStatusFailed"
};
function DocumentsPage() {
	const { t } = useWazenLocale();
	const { data: profile } = useProfile();
	const currency = profile?.base_currency || "KWD";
	const documents = useDocuments();
	const upload = useUploadDocument();
	const update = useUpdateDocument();
	const remove = useDeleteDocument();
	const requestExtraction = useRequestExtraction();
	const saveRecord = useSaveDocumentRecord();
	const fileInput = (0, import_react.useRef)(null);
	const cameraInput = (0, import_react.useRef)(null);
	const [kind, setKind] = (0, import_react.useState)("receipt");
	const [step, setStep] = (0, import_react.useState)("choose");
	const [localPreview, setLocalPreview] = (0, import_react.useState)(null);
	const [fileName, setFileName] = (0, import_react.useState)(null);
	const [document, setDocument] = (0, import_react.useState)(null);
	const [fields, setFields] = (0, import_react.useState)(emptyExtraction(currency));
	const [notice, setNotice] = (0, import_react.useState)(null);
	const [sampleShown, setSampleShown] = (0, import_react.useState)(false);
	const [errorText, setErrorText] = (0, import_react.useState)(null);
	const reset = () => {
		if (localPreview) URL.revokeObjectURL(localPreview);
		setLocalPreview(null);
		setFileName(null);
		setDocument(null);
		setFields(emptyExtraction(currency));
		setNotice(null);
		setSampleShown(false);
		setErrorText(null);
		setStep("choose");
	};
	const onPick = async (file) => {
		if (!file) return;
		if (localPreview) URL.revokeObjectURL(localPreview);
		setLocalPreview(file.type.startsWith("image/") ? URL.createObjectURL(file) : null);
		setFileName(file.name);
		setStep("preview");
		try {
			const created = await upload.mutateAsync({
				file,
				kind,
				title: file.name
			});
			setDocument(created);
		} catch (error) {
			setErrorText(error instanceof Error ? error.message : "upload failed");
			setStep("error");
		}
	};
	const runExtraction = async () => {
		if (!document) return;
		setStep("processing");
		try {
			const outcome = await requestExtraction.mutateAsync(document);
			if (outcome.status === "extracted") {
				setFields(mergeExtraction(emptyExtraction(currency), outcome.fields));
				await update.mutateAsync({
					id: document.id,
					status: "review",
					extractionSource: extractionProvider().name
				});
				setNotice(null);
			} else {
				setNotice(t("aiNotConnectedBody"));
				await update.mutateAsync({
					id: document.id,
					status: "review",
					errorMessage: null
				});
				setFields(emptyExtraction(currency));
			}
			setStep("review");
		} catch (error) {
			setErrorText(error instanceof Error ? error.message : "extraction failed");
			setStep("error");
		}
	};
	const save = async () => {
		if (!document) return;
		try {
			await saveRecord.mutateAsync({
				document,
				fields
			});
			setStep("saved");
		} catch (error) {
			setErrorText(error instanceof Error ? error.message : "save failed");
			setStep("error");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 wazen-enter",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "wazen-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "wazen-label",
						children: t("documentsNav")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 text-3xl sm:text-4xl",
						children: t("documentsTitle")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-xl text-muted-foreground",
						children: t("documentsSubtitle")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: t("chooseDocType"),
				children: step === "choose" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-3",
							children: DOCUMENT_KINDS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setKind(option),
								className: cn("wazen-interactive rounded-2xl border px-4 py-3 text-start text-sm", kind === option ? "border-primary/60 bg-secondary" : "border-border/70 hover:bg-secondary/60"),
								children: t(KIND_KEY[option])
							}, option))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => fileInput.current?.click(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadIcon, {
									className: "size-4",
									strokeWidth: ICON_STROKE
								}), t("uploadFile")]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "secondary",
								onClick: () => cameraInput.current?.click(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraIcon, {
									className: "size-4",
									strokeWidth: ICON_STROKE
								}), t("takePhoto")]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileInput,
							type: "file",
							accept: "image/*,application/pdf",
							className: "hidden",
							onChange: (event) => onPick(event.target.files?.[0])
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: cameraInput,
							type: "file",
							accept: "image/*",
							capture: "environment",
							className: "hidden",
							onChange: (event) => onPick(event.target.files?.[0])
						})
					]
				}) : step === "preview" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg",
							children: t("previewTitle")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentPreview, {
							src: localPreview,
							name: fileName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: runExtraction,
								disabled: !document || upload.isPending,
								children: [upload.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, { className: "size-4 animate-spin" }) : null, t("continueLabel")]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								onClick: reset,
								children: t("uploadAnother")
							})]
						})
					]
				}) : step === "processing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-h-40 flex-col items-center justify-center gap-3 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, { className: "size-6 animate-spin text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: t("processingTitle")
					})]
				}) : step === "review" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [
						notice ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border/70 bg-secondary/60 p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2 text-sm font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertIcon, {
										className: "size-4",
										strokeWidth: ICON_STROKE
									}), t("aiNotConnectedTitle")]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: notice
								}),
								!sampleShown ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "sm",
									className: "mt-3",
									onClick: () => {
										setFields(sampleExtraction(kind, currency));
										setSampleShown(true);
									},
									children: t("previewSample")
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-xs text-muted-foreground",
									children: t("sampleNotice")
								})
							]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg",
							children: t("reviewTitle")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: t("reviewSubtitle")
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentPreview, {
							src: localPreview,
							name: fileName,
							compact: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExtractedFieldsForm, {
							kind,
							fields,
							onChange: setFields
						}),
						savesAsTransaction(kind) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: t("createsExpenseNote")
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: save,
								disabled: saveRecord.isPending,
								children: [saveRecord.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, { className: "size-4 animate-spin" }) : null, t("saveRecord")]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								onClick: () => setStep("preview"),
								children: t("backLabel")
							})]
						})
					]
				}) : step === "saved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, {
							className: "mx-auto size-6 text-chart-2",
							strokeWidth: ICON_STROKE
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg",
							children: t("savedTitle")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: t("savedBody")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => {
								reset();
								toast.success(t("savedTitle"));
							},
							children: t("uploadAnother")
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-2 text-sm font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertIcon, {
								className: "size-4",
								strokeWidth: ICON_STROKE
							}), t("errorTitle")]
						}),
						errorText ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: errorText
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => setStep(document ? "preview" : "choose"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RetryIcon, {
									className: "size-4",
									strokeWidth: ICON_STROKE
								}), t("retryLabel")]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								onClick: reset,
								children: t("uploadAnother")
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisclosurePanel, {
				title: t("myDocuments"),
				summary: t("documentHistorySummary"),
				children: documents.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex min-h-24 items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, { className: "size-5 animate-spin text-muted-foreground" })
				}) : (documents.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentIcon, {
						className: "size-5",
						strokeWidth: ICON_STROKE
					}),
					title: t("noDocuments"),
					description: t("noDocumentsDescription")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-border/70",
					children: (documents.data ?? []).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentIcon, {
								className: "size-4 shrink-0 text-muted-foreground",
								strokeWidth: ICON_STROKE
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-semibold",
									children: row.title || row.file_name || t("documentsNav")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 truncate text-xs text-muted-foreground",
									children: [
										t(KIND_KEY[row.doc_type]),
										" · ",
										t(STATUS_KEY[row.status]),
										" ·",
										" ",
										formatDate(row.created_at)
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								"aria-label": t("deleteLabel"),
								onClick: () => remove.mutate(row),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteIcon, {
									className: "size-4",
									strokeWidth: ICON_STROKE
								})
							})
						]
					}, row.id))
				})
			})
		]
	}) });
}
function DocumentPreview({ src, name, compact }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex items-center justify-center overflow-hidden rounded-2xl border border-border/70 bg-secondary/50", compact ? "max-h-40" : "max-h-72"),
		children: src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt: name ?? "",
			className: cn("w-full object-contain", compact ? "max-h-40" : "max-h-72")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-6 py-10 text-sm text-muted-foreground",
			children: name
		})
	});
}
//#endregion
export { DocumentsPage as component };
