"use client";

import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <header>
        <nav>
          <h1 style={{marginLeft:"20px",marginBottom:"10px",marginTop:"10px"}}>Novel Reader</h1>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
