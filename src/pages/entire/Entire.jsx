import { React, useState, useEffect } from "react";
import { Footer } from "components/layout/Footer";
import { MultiCategoryComponent } from "components/common/MultiCategoryComponent";
import { Header } from "components/layout/Header";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { ProductRecommendations } from "components/entire/Product";
import { Layout } from "components/layout/DamDdaContainer";

export const Entire = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [category, setCategory] = useState(query.get("category") || "전체 ");
  const [search, setSearch] = useState(query.get("search") || "");

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const updatedSearch = query.get("search") || "";
    setSearch(updatedSearch);
  }, [location.search]);

  return (
    <>
      <Layout>
        <div key={location.pathname + location.state?.forceReload}>
          <Box sx={{ marginTop: "150px" }}>
            {" "}
            {/* marginTop으로 여백 조절 */}
            <MultiCategoryComponent setCategory={setCategory} />
          </Box>
          <ProductRecommendations
            cartegory={category}
            search={search}
          ></ProductRecommendations>
        </div>
      </Layout>
    </>
  );
};
