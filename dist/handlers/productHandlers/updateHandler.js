"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = void 0;
const ProductDAO_1 = require("../../dao/ProductDAO");
function updateProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, description, price, stock } = req.body;
            const productId = parseInt(req.params.id, 10);
            const updatedProduct = yield (0, ProductDAO_1.updateProductById)(productId, name, description, price, stock);
            res.send('product update success').json(updatedProduct);
        }
        catch (error) {
            console.error('product update failed', error);
            res.send('product update failed');
        }
    });
}
exports.updateProduct = updateProduct;
// export async function updateProduct(event:APIGatewayProxyEvent):Promise<APIGatewayProxyResult>{
//     try{
//         const {id,name,description,price,stock}=JSON.parse(event.body || '{}');
//         const productId=parseInt(id,10);
//         const updatedProduct=await updateProductById(productId,name,description,price,stock);
//         return {
//             statusCode: 200,
//             body: JSON.stringify(
//                 { message: 'Create operation successful', "Updatedproduct":updatedProduct }
//                 )
//             };
//     } catch(error){
//        return{
//         statusCode: 500,
//         body: JSON.stringify({ 
//             message: 'Create operation unsuccessful'
//             })
//         };
//        }
//     }
