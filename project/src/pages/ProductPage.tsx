import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { fetchProdutoById } from "../data/apiService";
import { CartItem, Variation } from "../types";

export function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  const [product, setProduct] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentVariation, setCurrentVariation] = useState<any>(null);

  // Carregar o produto pelo ID
  useEffect(() => {
    if (id) {
      fetchProdutoById(id)
        .then((response) => {
          const productMapped = {
            ...response,
            variacoes: response.variacoes.map((v: any) => ({
              ...v,
              color: v.cor,
              size: v.tamanho,
              price: v.preco,
              stock: v.estoque,
            })),
          };
          setProduct(productMapped);
        })
        .catch((error) => {
          console.error("Erro ao buscar produto:", error);
        });
    }
  }, [id]);

  // Atualizar a variação conforme seleção
  useEffect(() => {
    if (product && product.variacoes) {
      const variation = product.variacoes.find(
        (v: any) =>
          v.cor === selectedColor &&
          v.tamanho === selectedSize &&
          v.material === selectedMaterial
      );
      setCurrentVariation(variation || null);
    }
  }, [selectedColor, selectedSize, selectedMaterial, product]);

  // Adicionar produto ao carrinho
  const handleAddToCart = () => {
    console.log("Produto:", product); // Verifique no console do navegador

    if (!product || !product.variacoes) {
      alert("Erro: Produto ou variações não carregadas.");
      return;
    }

    if (!selectedColor || !selectedSize || !selectedMaterial) {
      alert("Selecione cor, tamanho e material.");
      return;
    }

    const currentVariation = product.variacoes.find(
      (v: Variation) =>
        v.color === selectedColor &&
        v.size === selectedSize &&
        v.material === selectedMaterial
    );

    if (!currentVariation) {
      alert("Variedade não encontrada.");
      return;
    }

    const item: CartItem = {
      id: product.id,
      name: product.name,
      image: product.images?.[0]?.url || '/images/placeholder.jpg',
      price: currentVariation.preco,
      quantity,
      selectedColor,
      selectedSize,
      selectedMaterial,
      assemblyOption: "self",
    };

    addItem(item);
    navigate("/cart");
  };


  if (!product) {
    return <div>Carregando produto...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
      <div>
        <img
          src={`http://localhost:8080${product.imagens?.[0]?.url || '/images/default.jpg'}`}
          alt={product.nome || 'Produto sem nome'}
          className="w-full h-96 object-cover rounded-lg"
        />
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-4">{product.nome}</h1>
        <p className="text-gray-600 mb-4">{product.descricao}</p>

        <p className="text-2xl font-semibold text-gray-900 mb-4">
          {currentVariation
            ? `$${(currentVariation.preco * quantity).toFixed(2)}`
            : product.variacoes?.[0]?.preco !== undefined
              ? `$${(product.variacoes[0].preco * quantity).toFixed(2)}`
              : "Preço não disponível"}
        </p>

        {/* Dropdown de Cor */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Cor</label>
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="">Selecione uma cor</option>
            {Array.from(new Set(product.variacoes.map((v: any) => v.cor))).map((cor, index) => (
              <option key={index} value={cor?.toString()}> {/* <- Adicionei .toString() */}
                {cor?.toString()}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown de Tamanho */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Tamanho</label>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="">Selecione um tamanho</option>
            {Array.from(new Set(product.variacoes.map((v: any) => v.tamanho))).map((tamanho, index) => (
              <option key={index} value={tamanho?.toString()}> {/* <- Adicionei .toString() */}
                {tamanho?.toString()}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown de Material */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Material</label>
          <select
            value={selectedMaterial}
            onChange={(e) => setSelectedMaterial(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="">Selecione um material</option>
            {Array.from(new Set(product.variacoes.map((v: any) => v.material))).map((material, index) => (
              <option key={index} value={material?.toString()}> {/* <- Adicionei .toString() */}
                {material?.toString()}
              </option>
            ))}
          </select>
        </div>


        {/* Quantidade */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Quantidade</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            min="1"
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        {/* Botão Adicionar ao Carrinho */}
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}
