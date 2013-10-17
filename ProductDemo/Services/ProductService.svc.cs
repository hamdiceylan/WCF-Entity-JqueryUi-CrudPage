using ProductDemo.Business.Library;
using ProductDemo.Business.Operation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using System.Web.Script.Serialization;
using Newtonsoft;
using ProductDemo.Model;

namespace ProductDemo.Services
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "ProductService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select ProductService.svc or ProductService.svc.cs at the Solution Explorer and start debugging.
    [ServiceBehavior(AddressFilterMode = AddressFilterMode.Any)]
    public class ProductService : IProductService
    {
        public string GetAllProduct()
        {
            ProductOperation productOperation = new ProductOperation();
            List<ProductObject> productList = productOperation.GetProduct();

            string json = Newtonsoft.Json.JsonConvert.SerializeObject(productList);
            return json;
        }

        public string DeleteProduct(string id)
        {
            ProductOperation productOperation = new ProductOperation();
            string result = productOperation.DeleteProduct(Convert.ToInt32(id));
            return result;
        }

        public string AddNewProduct(string data)
        {
            string result = "";
            try
            {
                Products product = new Products();
                product.ProductName = data.Split(';')[0].ToString();
                product.SupplierID = Convert.ToInt32(data.Split(';')[1].ToString());
                product.CategoryID = Convert.ToInt32(data.Split(';')[2].ToString());
                product.QuantityPerUnit = data.Split(';')[3].ToString();
                product.UnitPrice = Convert.ToDecimal(data.Split(';')[4].ToString());
                product.UnitsInStock = Convert.ToInt16(data.Split(';')[5].ToString());
                product.UnitsOnOrder = Convert.ToInt16(data.Split(';')[6].ToString());
                product.ReorderLevel = Convert.ToInt16(data.Split(';')[7].ToString());

                if (data.Split(';')[8].ToString() == "1")
                {
                    product.Discontinued = true;
                }
                else if (data.Split(';')[8].ToString() == "0")
                {
                    product.Discontinued = false;
                }

                ProductOperation productOperation = new ProductOperation();
                result = productOperation.InsertProduct(product);
            }
            catch (Exception)
            {

                result = "An error occurred during this operation.";
            }

            return result;
        }

        public string GetProductFromId(string id)
        {
            ProductOperation productOperation = new ProductOperation();
            List<ProductObject> productList = productOperation.GetProductDetailFromID(Convert.ToInt32(id));

            string json = Newtonsoft.Json.JsonConvert.SerializeObject(productList);
            return json;
        }

        public string UpdateProduct(string data)
        {
            string result = "";
            try
            {
                Products product = new Products();
                product.ProductName = data.Split(';')[1].ToString();
                product.SupplierID = Convert.ToInt32(data.Split(';')[2].ToString());
                product.CategoryID = Convert.ToInt32(data.Split(';')[3].ToString());
                product.QuantityPerUnit = data.Split(';')[4].ToString();
                product.UnitPrice = Convert.ToDecimal(data.Split(';')[5].ToString());
                product.UnitsInStock = Convert.ToInt16(data.Split(';')[6].ToString());
                product.UnitsOnOrder = Convert.ToInt16(data.Split(';')[7].ToString());
                product.ReorderLevel = Convert.ToInt16(data.Split(';')[8].ToString());

                if (data.Split(';')[9].ToString() == "1")
                {
                    product.Discontinued = true;
                }
                else if (data.Split(';')[9].ToString() == "0")
                {
                    product.Discontinued = false;
                }

                ProductOperation productOperation = new ProductOperation();
                result =productOperation.UpdateProduct(product, Convert.ToInt32(data.Split(';')[0].ToString()));
            }
            catch (Exception)
            {
                result = "An error occurred during this operation.";
            }

            return result;
        }
    }
}
