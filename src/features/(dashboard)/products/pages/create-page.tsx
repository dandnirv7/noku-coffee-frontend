import ProductForm from "../components/product-form";

export default function CreateProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Tambah Produk Baru
        </h1>
        <p className="text-muted-foreground text-sm">
          Lengkapi detail produk kopi Anda di bawah ini
        </p>
      </div>
      <ProductForm />
    </div>
  );
}
