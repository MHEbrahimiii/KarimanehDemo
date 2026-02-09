"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type FundAccount = {
  sheba: string;
  accountNumber: string;
  cardNumber: string;
};

const STORAGE_KEY = "karimaneh_fund_account";

const defaultFundAccount: FundAccount = {
  sheba: "IR011286400000004102002044758016",
  accountNumber: "0302-5003-0213-2305",
  cardNumber: "6037-9982-0465-2222",
};

type FundAccountContextType = {
  fundAccount: FundAccount;
  setFundAccount: (data: Partial<FundAccount> | ((prev: FundAccount) => Partial<FundAccount>)) => void;
};

const FundAccountContext = createContext<FundAccountContextType | null>(null);

function loadFromStorage(): FundAccount {
  if (typeof window === "undefined") return defaultFundAccount;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultFundAccount;
    const parsed = JSON.parse(stored) as Partial<FundAccount>;
    return {
      sheba: parsed.sheba ?? defaultFundAccount.sheba,
      accountNumber: parsed.accountNumber ?? defaultFundAccount.accountNumber,
      cardNumber: parsed.cardNumber ?? defaultFundAccount.cardNumber,
    };
  } catch {
    return defaultFundAccount;
  }
}

export function FundAccountProvider({ children }: { children: React.ReactNode }) {
  const [fundAccount, setFundAccountState] = useState<FundAccount>(defaultFundAccount);

  useEffect(() => {
    setFundAccountState(loadFromStorage());
  }, []);

  const setFundAccount = useCallback(
    (data: Partial<FundAccount> | ((prev: FundAccount) => Partial<FundAccount>)) => {
      setFundAccountState((prev) => {
        const next = typeof data === "function" ? data(prev) : data;
        const nextState: FundAccount = {
          sheba: next.sheba ?? prev.sheba,
          accountNumber: next.accountNumber ?? prev.accountNumber,
          cardNumber: next.cardNumber ?? prev.cardNumber,
        };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
        } catch {
          // ignore
        }
        return nextState;
      });
    },
    []
  );

  return (
    <FundAccountContext.Provider value={{ fundAccount, setFundAccount }}>
      {children}
    </FundAccountContext.Provider>
  );
}

export function useFundAccount() {
  const ctx = useContext(FundAccountContext);
  if (!ctx) {
    return {
      fundAccount: defaultFundAccount,
      setFundAccount: () => {},
    };
  }
  return ctx;
}
