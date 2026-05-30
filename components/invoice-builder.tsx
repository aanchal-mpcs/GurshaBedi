"use client";

import { useMemo, useState } from "react";
import jsPDF from "jspdf";
import { invoiceDefaults } from "@/lib/site-data";

type InvoiceItem = {
  id: string;
  description: string;
  quantity: number;
  rate: number;
};

type InvoiceFormState = {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  taxPercent: number;
  discountAmount: number;
  notes: string;
  items: InvoiceItem[];
};

const createItem = (): InvoiceItem => ({
  id: crypto.randomUUID(),
  description: "",
  quantity: 1,
  rate: 0
});

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2
});

export function InvoiceBuilder() {
  const [formState, setFormState] = useState<InvoiceFormState>({
    invoiceNumber: "GB-001",
    issueDate: new Date().toISOString().slice(0, 10),
    dueDate: "",
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    taxPercent: 0,
    discountAmount: 0,
    notes: "",
    items: [createItem()]
  });

  const subtotal = useMemo(
    () => formState.items.reduce((sum, item) => sum + item.quantity * item.rate, 0),
    [formState.items]
  );
  const taxAmount = (subtotal * formState.taxPercent) / 100;
  const total = subtotal + taxAmount - formState.discountAmount;

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setFormState((current) => ({
      ...current,
      items: current.items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    }));
  };

  const addItem = () => {
    setFormState((current) => ({ ...current, items: [...current.items, createItem()] }));
  };

  const removeItem = (id: string) => {
    setFormState((current) => ({
      ...current,
      items: current.items.length > 1 ? current.items.filter((item) => item.id !== id) : current.items
    }));
  };

  const downloadPdf = () => {
    const pdf = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    let y = 54;

    pdf.setFillColor(38, 17, 19);
    pdf.rect(0, 0, pageWidth, 136, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(26);
    pdf.text(invoiceDefaults.businessName, 42, 60);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    pdf.text(invoiceDefaults.businessEmail, 42, 82);
    pdf.text(invoiceDefaults.businessPhone, 42, 98);
    pdf.text(invoiceDefaults.businessAddress, 42, 114);

    pdf.setTextColor(38, 17, 19);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(24);
    pdf.text("Invoice", pageWidth - 126, 60);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    pdf.text(`Invoice #: ${formState.invoiceNumber}`, pageWidth - 170, 82);
    pdf.text(`Issue date: ${formState.issueDate || "Add date"}`, pageWidth - 170, 98);
    pdf.text(`Due date: ${formState.dueDate || "Add due date"}`, pageWidth - 170, 114);

    y = 170;
    pdf.setFont("helvetica", "bold");
    pdf.text("Bill to", 42, y);
    pdf.setFont("helvetica", "normal");
    y += 20;
    pdf.text(formState.clientName || "Client name", 42, y);
    y += 16;
    pdf.text(formState.clientEmail || "Client email", 42, y);
    y += 16;

    const clientAddressLines = pdf.splitTextToSize(formState.clientAddress || "Client address", 220);
    pdf.text(clientAddressLines, 42, y);

    y = 294;
    pdf.setFont("helvetica", "bold");
    pdf.text("Description", 42, y);
    pdf.text("Qty", 320, y);
    pdf.text("Rate", 386, y);
    pdf.text("Amount", 470, y);
    pdf.setDrawColor(210, 191, 182);
    pdf.line(42, y + 8, pageWidth - 42, y + 8);

    y += 30;
    pdf.setFont("helvetica", "normal");

    formState.items.forEach((item) => {
      const lines = pdf.splitTextToSize(item.description || "Line item", 240);
      pdf.text(lines, 42, y);
      pdf.text(String(item.quantity), 320, y);
      pdf.text(currencyFormatter.format(item.rate), 386, y);
      pdf.text(currencyFormatter.format(item.quantity * item.rate), 470, y);
      y += Math.max(24, lines.length * 16);
      pdf.line(42, y, pageWidth - 42, y);
      y += 18;
    });

    y += 12;
    pdf.setFont("helvetica", "bold");
    pdf.text("Subtotal", 386, y);
    pdf.text(currencyFormatter.format(subtotal), 470, y);
    y += 20;
    pdf.text(`Tax (${formState.taxPercent}%)`, 386, y);
    pdf.text(currencyFormatter.format(taxAmount), 470, y);
    y += 20;
    pdf.text("Discount", 386, y);
    pdf.text(currencyFormatter.format(formState.discountAmount), 470, y);
    y += 28;
    pdf.setFontSize(13);
    pdf.text("Total", 386, y);
    pdf.text(currencyFormatter.format(total), 470, y);

    y += 42;
    pdf.setFontSize(11);
    pdf.setFont("helvetica", "bold");
    pdf.text("Payment instructions", 42, y);
    pdf.setFont("helvetica", "normal");
    const paymentLines = pdf.splitTextToSize(invoiceDefaults.paymentInstructions, pageWidth - 84);
    pdf.text(paymentLines, 42, y + 18);

    if (formState.notes.trim()) {
      const noteLines = pdf.splitTextToSize(formState.notes.trim(), pageWidth - 84);
      pdf.setFont("helvetica", "bold");
      pdf.text("Notes", 42, y + 72);
      pdf.setFont("helvetica", "normal");
      pdf.text(noteLines, 42, y + 90);
    }

    pdf.save(`${formState.invoiceNumber || "invoice"}.pdf`);
  };

  return (
    <div className="invoice-layout">
      <section className="invoice-form">
        <div className="invoice-form__grid">
          <label>
            Invoice number
            <input
              value={formState.invoiceNumber}
              onChange={(event) => setFormState({ ...formState, invoiceNumber: event.target.value })}
            />
          </label>
          <label>
            Issue date
            <input
              type="date"
              value={formState.issueDate}
              onChange={(event) => setFormState({ ...formState, issueDate: event.target.value })}
            />
          </label>
          <label>
            Due date
            <input
              type="date"
              value={formState.dueDate}
              onChange={(event) => setFormState({ ...formState, dueDate: event.target.value })}
            />
          </label>
          <label>
            Client name
            <input
              value={formState.clientName}
              onChange={(event) => setFormState({ ...formState, clientName: event.target.value })}
            />
          </label>
          <label>
            Client email
            <input
              type="email"
              value={formState.clientEmail}
              onChange={(event) => setFormState({ ...formState, clientEmail: event.target.value })}
            />
          </label>
          <label className="invoice-form__span">
            Client address
            <textarea
              rows={4}
              value={formState.clientAddress}
              onChange={(event) => setFormState({ ...formState, clientAddress: event.target.value })}
            />
          </label>
        </div>

        <div className="invoice-items">
          <div className="invoice-items__header">
            <h2>Line items</h2>
            <button type="button" onClick={addItem}>
              Add item
            </button>
          </div>
          {formState.items.map((item) => (
            <div className="invoice-item" key={item.id}>
              <label className="invoice-item__description">
                Description
                <input
                  value={item.description}
                  onChange={(event) => updateItem(item.id, "description", event.target.value)}
                />
              </label>
              <label>
                Qty
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={item.quantity}
                  onChange={(event) => updateItem(item.id, "quantity", Number(event.target.value))}
                />
              </label>
              <label>
                Rate
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.rate}
                  onChange={(event) => updateItem(item.id, "rate", Number(event.target.value))}
                />
              </label>
              <button type="button" className="invoice-item__remove" onClick={() => removeItem(item.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="invoice-form__grid">
          <label>
            Tax %
            <input
              type="number"
              min="0"
              step="0.01"
              value={formState.taxPercent}
              onChange={(event) => setFormState({ ...formState, taxPercent: Number(event.target.value) })}
            />
          </label>
          <label>
            Discount amount
            <input
              type="number"
              min="0"
              step="0.01"
              value={formState.discountAmount}
              onChange={(event) =>
                setFormState({ ...formState, discountAmount: Number(event.target.value) })
              }
            />
          </label>
          <label className="invoice-form__span">
            Notes
            <textarea
              rows={4}
              value={formState.notes}
              onChange={(event) => setFormState({ ...formState, notes: event.target.value })}
            />
          </label>
        </div>

        <button type="button" className="invoice-form__download" onClick={downloadPdf}>
          Download PDF
        </button>
      </section>

      <aside className="invoice-preview">
        <div className="invoice-preview__panel">
          <div className="invoice-preview__header">
            <div>
              <p>{invoiceDefaults.businessName}</p>
              <span>{invoiceDefaults.businessEmail}</span>
              <span>{invoiceDefaults.businessPhone}</span>
              <span>{invoiceDefaults.businessAddress}</span>
            </div>
            <div>
              <strong>Invoice</strong>
              <span>#{formState.invoiceNumber}</span>
              <span>{formState.issueDate || "Issue date"}</span>
              <span>{formState.dueDate || "Due date"}</span>
            </div>
          </div>

          <div className="invoice-preview__client">
            <strong>Bill to</strong>
            <span>{formState.clientName || "Client name"}</span>
            <span>{formState.clientEmail || "Client email"}</span>
            <span>{formState.clientAddress || "Client address"}</span>
          </div>

          <div className="invoice-preview__items">
            <div className="invoice-preview__row invoice-preview__row--head">
              <span>Description</span>
              <span>Qty</span>
              <span>Rate</span>
              <span>Amount</span>
            </div>
            {formState.items.map((item) => (
              <div className="invoice-preview__row" key={item.id}>
                <span>{item.description || "Line item"}</span>
                <span>{item.quantity}</span>
                <span>{currencyFormatter.format(item.rate)}</span>
                <span>{currencyFormatter.format(item.quantity * item.rate)}</span>
              </div>
            ))}
          </div>

          <div className="invoice-preview__totals">
            <div>
              <span>Subtotal</span>
              <strong>{currencyFormatter.format(subtotal)}</strong>
            </div>
            <div>
              <span>Tax</span>
              <strong>{currencyFormatter.format(taxAmount)}</strong>
            </div>
            <div>
              <span>Discount</span>
              <strong>{currencyFormatter.format(formState.discountAmount)}</strong>
            </div>
            <div className="invoice-preview__total">
              <span>Total</span>
              <strong>{currencyFormatter.format(total)}</strong>
            </div>
          </div>

          <div className="invoice-preview__notes">
            <strong>Payment instructions</strong>
            <p>{invoiceDefaults.paymentInstructions}</p>
            {formState.notes.trim() ? (
              <>
                <strong>Notes</strong>
                <p>{formState.notes}</p>
              </>
            ) : null}
          </div>
        </div>
      </aside>
    </div>
  );
}
