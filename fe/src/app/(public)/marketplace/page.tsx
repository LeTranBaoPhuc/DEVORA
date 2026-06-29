"use client";

import { useState, useEffect } from "react";
import { Search, LayoutGrid, List as ListIcon, Filter } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductCard } from "@/components/marketplace/product-card";
import { FilterSidebar, FilterState } from "@/components/marketplace/filter-sidebar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

export default function MarketplacePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    minPrice: "",
    maxPrice: "",
    productTypes: [],
    techStacks: [],
    minRating: null,
    verifiedSeller: false,
  });

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1); // Reset page on filter change
  };

  const handleClearAll = () => {
    setFilters({
      categories: [],
      minPrice: "",
      maxPrice: "",
      productTypes: [],
      techStacks: [],
      minRating: null,
      verifiedSeller: false,
    });
    setSearch("");
    setSearchInput("");
    setSort("newest");
    setPage(1);
  };

  // Debounced search
  const [searchInput, setSearchInput] = useState("");
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1); // Reset page on new search
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.append("page", page.toString());
        queryParams.append("size", "9");
        queryParams.append("sort", sort);
        if (search) queryParams.append("search", search);
        
        if (filters.categories.length > 0) {
          queryParams.append("categories", filters.categories.join(","));
        }
        if (filters.minPrice) queryParams.append("minPrice", filters.minPrice);
        if (filters.maxPrice) queryParams.append("maxPrice", filters.maxPrice);
        if (filters.productTypes.length > 0) {
          queryParams.append("productTypes", filters.productTypes.join(","));
        }
        if (filters.techStacks.length > 0) {
          queryParams.append("techStacks", filters.techStacks.join(","));
        }
        if (filters.minRating) queryParams.append("minRating", filters.minRating.toString());
        if (filters.verifiedSeller) queryParams.append("verifiedSeller", "true");

        const res = await fetch(`http://localhost:8080/api/v1/marketplace/products?${queryParams}`);
        const json = await res.json();
        if (json.status === 200 && json.data) {
          setProducts(json.data.data);
          setTotalPages(json.data.totalPages);
          setTotalItems(json.data.totalItems);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page, sort, search, filters]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-6xl font-heading font-black mb-4 tracking-tighter">Creative Assets & Tools</h1>
        <p className="text-muted-foreground text-xl max-w-2xl">Discover the best tools, scripts, and applications built by the world&apos;s top developers. Ready to deploy.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar Filters */}
        <aside className="w-full lg:w-64 shrink-0">
          <FilterSidebar filters={filters} onFilterChange={handleFilterChange} onClearAll={handleClearAll} />
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-border">
            <div className="flex-1 w-full flex items-center gap-2">
              <Sheet>
                <SheetTrigger className={buttonVariants({ variant: "outline", size: "icon", className: "lg:hidden shrink-0" })}>
                  <Filter className="w-4 h-4" />
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <SheetTitle className="sr-only">Filters</SheetTitle>
                  <div className="mt-6">
                    <FilterSidebar filters={filters} onFilterChange={handleFilterChange} onClearAll={handleClearAll} />
                  </div>
                </SheetContent>
              </Sheet>
              
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search products..." 
                  className="pl-9 bg-card border-border hover:border-border-hover w-full"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-sm text-muted-foreground hidden md:inline-block">
                Showing {products.length > 0 ? (page - 1) * 9 + 1 : 0}-{Math.min(page * 9, totalItems)} of {totalItems}
              </span>
              
              <Select value={sort} onValueChange={(val) => { setSort(val); setPage(1); }}>
                <SelectTrigger className="w-[160px] bg-card border-border">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="best-selling">Best Selling</SelectItem>
                  <SelectItem value="top-rated">Top Rated</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center rounded-md border border-border p-1 bg-card hidden sm:flex">
                <Button 
                  variant={viewMode === "grid" ? "secondary" : "ghost"} 
                  size="icon" 
                  className="w-7 h-7"
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
                <Button 
                  variant={viewMode === "list" ? "secondary" : "ghost"} 
                  size="icon" 
                  className="w-7 h-7"
                  onClick={() => setViewMode("list")}
                >
                  <ListIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Product Grid / List */}
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
            </div>
          ) : (
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" 
              : "flex flex-col gap-4"
            }>
              {products.map((product) => (
                <ProductCard key={product.id} {...product} layout={viewMode} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              <Button 
                variant="outline" 
                disabled={page <= 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              
              {/* Simple pagination display for now */}
              <span className="text-sm px-4">Page {page} of {totalPages}</span>
              
              <Button 
                variant="outline" 
                disabled={page >= totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
