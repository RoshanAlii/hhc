"use client";

import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { VAT_RATE } from "./data";

export interface CartItem {
  key: string; // unique per line (slug + variant)
  slug: string;
  name: string;
  meta?: string;
  price: number;
  qty: number;
  kind: "service" | "package";
  date?: string; // yyyy-mm-dd appointment date
  time?: string; // HH:MM appointment time
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  vat: number;
  total: number;
  ready: boolean;
  addItem: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  removeItem: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  updateItem: (key: string, patch: Partial<CartItem>) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "healthserve.cart.v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, ready]);

  const addItem = useCallback((item: Omit<CartItem, "qty"> & { qty?: number }) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.key === item.key);
      if (existing) {
        return prev.map((i) => (i.key === item.key ? { ...i, qty: i.qty + (item.qty ?? 1) } : i));
      }
      return [...prev, { ...item, qty: item.qty ?? 1 }];
    });
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setItems((prev) =>
      prev.flatMap((i) => (i.key === key ? (qty <= 0 ? [] : [{ ...i, qty }]) : [i])),
    );
  }, []);

  const updateItem = useCallback((key: string, patch: Partial<CartItem>) => {
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, ...patch } : i)));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const vat = Math.round(subtotal * VAT_RATE);
    const count = items.reduce((sum, i) => sum + i.qty, 0);
    return { items, count, subtotal, vat, total: subtotal + vat, ready, addItem, removeItem, setQty, updateItem, clear };
  }, [items, ready, addItem, removeItem, setQty, updateItem, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

// ---- Order storage (for confirmation page) ------------------------------
export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  vat: number;
  total: number;
  payment: string;
  card?: string;
  slot: string;
  createdAt: number;
}

const ORDER_KEY = "healthserve.lastOrder.v1";

export function saveOrder(order: Order) {
  try {
    localStorage.setItem(ORDER_KEY, JSON.stringify(order));
  } catch {
    /* ignore */
  }
}

export function loadOrder(): Order | null {
  try {
    const raw = localStorage.getItem(ORDER_KEY);
    return raw ? (JSON.parse(raw) as Order) : null;
  } catch {
    return null;
  }
}
