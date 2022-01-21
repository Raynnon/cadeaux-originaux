import { useParams } from "react-router-dom";

import EditProduct from "../../editProduct/EditProduct";

export default function Product() {
  const { productId } = useParams();

  return <EditProduct productId={productId} />;
}
