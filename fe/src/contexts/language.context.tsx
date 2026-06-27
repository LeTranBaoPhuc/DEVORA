"use client";

import React, { createContext, useContext, useState } from "react";

type Language = "EN" | "VI";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  EN: {
    "nav.marketplace": "Marketplace",
    "nav.auctions": "Auctions",
    "nav.more": "More",
    "nav.about": "About Us",
    "nav.support": "Support",
    "nav.all_product": "All product",
    "nav.templates": "Templates",
    "nav.ai_agents": "AI Agents",
    "nav.search": "Search...",
    "hero.badge": "Over 10,000+ vibe coding products listed",
    "hero.title1": "THE MARKETPLACE",
    "hero.title2": "FOR",
    "hero.title_highlight": "VIBE CODERS",
    "hero.desc": "Buy, sell, and request custom AI Agents, Mini Apps, Automation Scripts, and Prompt Templates. Join the revolution of AI-assisted development.",
    "hero.btn_browse": "BROWSE PRODUCTS",
    "hero.btn_post": "POST A REQUEST",
    "hero.stats.products": "Total Products",
    "hero.stats.transactions": "Transactions",
  },
  VI: {
    "nav.marketplace": "Chợ Ứng Dụng",
    "nav.auctions": "Đấu Giá",
    "nav.more": "Thêm",
    "nav.about": "Về Chúng Tôi",
    "nav.support": "Hỗ Trợ",
    "nav.all_product": "Tất cả sản phẩm",
    "nav.templates": "Mẫu Template",
    "nav.ai_agents": "AI Agents",
    "nav.search": "Tìm kiếm...",
    "hero.badge": "Hơn 10,000+ sản phẩm dành cho vibe coders",
    "hero.title1": "CHỢ ỨNG DỤNG",
    "hero.title2": "DÀNH CHO",
    "hero.title_highlight": "VIBE CODERS",
    "hero.desc": "Mua, bán, và yêu cầu các AI Agents, Mini Apps, Scripts tự động, và Prompt Templates tùy chỉnh. Hãy tham gia cuộc cách mạng phát triển cùng AI.",
    "hero.btn_browse": "KHÁM PHÁ SẢN PHẨM",
    "hero.btn_post": "ĐĂNG YÊU CẦU",
    "hero.stats.products": "Tổng Sản Phẩm",
    "hero.stats.transactions": "Giao Dịch",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("EN");

  const t = (key: string) => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
