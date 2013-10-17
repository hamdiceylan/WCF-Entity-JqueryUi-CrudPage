using ProductDemo.Business.Library;
using ProductDemo.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProductDemo.Business.Operation
{
    public class ProductOperation
    {
        public List<ProductObject> GetProduct()
        {
            List<ProductObject> result = new List<ProductObject>();
            using (NORTHWNDEntities context = new NORTHWNDEntities())
            {
                try
                {
                    result = (from p in context.Products
                              join c in context.Categories on p.CategoryID equals c.CategoryID
                              select new ProductObject
                              {
                                  ProductID = p.ProductID,
                                  ProductName = p.ProductName,
                                  CategoryName = c.CategoryName,
                                  SupplierID = p.SupplierID,
                                  UnitPrice = p.UnitPrice,
                                  UnitsOnOrder = p.UnitsOnOrder,
                                  UnitsInStock = p.UnitsInStock,
                                  QuantityPerUnit = p.QuantityPerUnit,
                                  ReorderLevel = p.ReorderLevel,
                                  Discontinued = p.Discontinued
                              }).ToList();
                }
                catch (Exception)
                {
                }
            }
            return result;
        }
        public List<ProductObject> GetProductDetailFromID(int id)
        {
            List<ProductObject> result = new List<ProductObject>();
            using (NORTHWNDEntities context = new NORTHWNDEntities())
            {
                try
                {
                    result = (from p in context.Products
                              join c in context.Categories on p.CategoryID equals c.CategoryID
                              where p.ProductID == id
                              select new ProductObject
                              {
                                  ProductID = p.ProductID,
                                  ProductName = p.ProductName,
                                  CategoryName = c.CategoryName,
                                  SupplierID = p.SupplierID,
                                  UnitPrice = p.UnitPrice,
                                  UnitsOnOrder = p.UnitsOnOrder,
                                  UnitsInStock = p.UnitsInStock,
                                  QuantityPerUnit = p.QuantityPerUnit,
                                  ReorderLevel = p.ReorderLevel,
                                  Discontinued = p.Discontinued,
                                  CategoryID = p.CategoryID
                              }).ToList();
                }
                catch (Exception)
                {
                }
            }
            return result;
        }
        public string DeleteProduct(int id)
        {
            string result = "";
            Products product = new Products();
            using (NORTHWNDEntities context = new NORTHWNDEntities())
            {
                try
                {
                    product = context.Products.FirstOrDefault(p => p.ProductID == id);
                    context.Products.Remove(product);
                    context.SaveChanges();
                    result = "The record has deleted succesfully.";
                }
                catch (Exception ex)
                {
                    result = "An error occurred during this operation.";
                }
            }
            return result;
        }
        public string InsertProduct(Products product)
        {
            string result = "";
            using (NORTHWNDEntities ent = new NORTHWNDEntities())
            {
                try
                {
                    ent.Products.Add(product);
                    ent.SaveChanges();
                    result = "The product has added successfully";
                }
                catch (Exception)
                {
                    result = "An error occurred during this operation.";
                }

            }
            return result;
        }
        public string UpdateProduct(Products product, int id)
        {
            string result = "";
            using (NORTHWNDEntities context = new NORTHWNDEntities())
            {
                Products currentproduct = new Products();
                try
                {
                    currentproduct = context.Products.FirstOrDefault(p => p.ProductID == id);
                    currentproduct.ProductName = product.ProductName;
                    currentproduct.CategoryID = product.CategoryID;
                    currentproduct.SupplierID = product.SupplierID;
                    currentproduct.QuantityPerUnit = product.QuantityPerUnit;
                    currentproduct.UnitPrice = product.UnitPrice;
                    currentproduct.UnitsInStock = product.UnitsInStock;
                    currentproduct.UnitsOnOrder = product.UnitsOnOrder;
                    currentproduct.ReorderLevel = product.ReorderLevel;
                    currentproduct.Discontinued = product.Discontinued;
                    context.SaveChanges();
                    result = "The record has updated succesfully.";
                }
                catch (Exception ex)
                {
                    result = "An error occurred during this operation.";
                }
            }
            return result;
        }
    }
}