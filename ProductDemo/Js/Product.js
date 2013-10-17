$(document).ready(function () {
    getProducts();
});

function getProducts() {
    $('body').html("");
    $.getJSON("http://localhost:1313/Services/ProductService.svc/getAllProduct",
        { get_param: 'value' }, function (data) {
            $.each(data, function (index, element) {
                var product = $.parseJSON(element);
                $.get('htmlTemplate/Template.htm', function (templates) {
                    $('body').append(templates);
                    $('#icerikTemplate').tmpl(element).appendTo('#body');
                    for (var i = 0; i < product.length; i++) {
                        $("#tbody").append("<tr>");
                        $("#tbody").append("<td>" + "<img src=\"images/icons/BoxEdit.png\" height=\"20\" onclick=\"OpenUpdateProductPopUp(" + product[i].ProductID.toString() + ")\" />" + "</td>");
                        $("#tbody").append("<td>" + "<img src=\"images/icons/delete.png\" height=\"30\" onclick=\"ConfirmPopUpForDelete(" + product[i].ProductID.toString() + ")\" />" + "</td>");
                        $("#tbody").append("<td>" + product[i].ProductID + "</td>");
                        $("#tbody").append("<td>" + product[i].ProductName + "</td>");
                        $("#tbody").append("<td>" + product[i].SupplierID + "</td>");
                        $("#tbody").append("<td>" + product[i].CategoryName + "</td>");
                        $("#tbody").append("<td>" + product[i].QuantityPerUnit + "</td>");
                        $("#tbody").append("<td>" + product[i].UnitPrice + "</td>");
                        $("#tbody").append("<td>" + product[i].UnitsInStock + "</td>");
                        $("#tbody").append("<td>" + product[i].UnitsOnOrder + "</td>");
                        $("#tbody").append("<td>" + product[i].ReorderLevel + "</td>");
                        $("#tbody").append("<td>" + product[i].Discontinued + "</td>");
                        $("#tbody").append("</tr>");
                    }
                });
            });
        });
}

function DeleteProduct(ID) {
    var Url = "http://localhost:1313/Services/ProductService.svc/deleteProduct/" + ID.toString();
    $.getJSON(Url,
    { get_param: 'value' }, function (data) {
        $.each(data, function (index, element) {
            alert(element);
            if (element != "An error occurred during this operation.") {
                getProducts();
            }
        });
    });
}

function ConfirmPopUpForDelete(ID) {
    $("#deleteDialog").dialog({
        autoOpen: true,
        height: 150,
        width: 300,
        modal: true,
        buttons: {
            "Delete": function () {
                DeleteProduct(ID);
                $(this).dialog("close");
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
}

function OpenAddNewProductPopUp() {
    $("#addNewDialog").dialog({
        autoOpen: true,
        height: 350,
        width: 385,
        modal: true,
        buttons: {
            "Save": function () {
                AddNewProduct();

            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
}

function AddNewProduct() {
    var ProductName = $("#ProductName").val();
    var Supplier = $("#Supplier option:selected").val();
    var CategoryId = $("#CategoryId option:selected").val();
    var QuantityPerUnit = $("#QuantityPerUnit").val();
    var UnitPrice = $("#UnitPrice").val();
    var UnitsInStock = $("#UnitsInStock").val();
    var UnitsInOrder = $("#UnitsInOrder").val();
    var ReorderedLevel = $("#ReorderedLevel").val();
    var Discontinued = $("#Discontinued option:selected").val();

    var data = "";
    data += ProductName;
    data += ";" + Supplier;
    data += ";" + CategoryId;
    data += ";" + QuantityPerUnit;
    data += ";" + UnitPrice;
    data += ";" + UnitsInStock;
    data += ";" + UnitsInOrder;
    data += ";" + ReorderedLevel;
    data += ";" + Discontinued;

    if (ProductName == "") {
        $("#WarningTextForAddProduct").text("Product Name is mandatory.");
    }
    else if (QuantityPerUnit == "") {
        $("#WarningTextForAddProduct").text("Quantity Per Unit is mandatory.");
    }
    else if (UnitPrice == "") {
        $("#WarningTextForAddProduct").text("Unit Price is mandatory.");
    }
    else if (UnitsInStock == "") {
        $("#WarningTextForAddProduct").text("Units In Stock is mandatory.");
    }
    else if (UnitsInOrder == "") {
        $("#WarningTextForAddProduct").text("Units In Order is mandatory.");
    }
    else if (ReorderedLevel == "") {
        $("#WarningTextForAddProduct").text("Reordered Level is mandatory.");
    }
    else {
        var Url = "http://localhost:1313/Services/ProductService.svc/addProduct/" + data.toString();
        $.getJSON(Url,
        { get_param: 'value' }, function (data) {
            $.each(data, function (index, element) {
                alert(element);
                if (element != "An error occurred during this operation.") {
                    $("#addNewDialog").dialog("close");
                    getProducts();
                }
            });
        });
    }
}
function OpenUpdateProductPopUp(ID) {
    $("#UpdateProductDialog").dialog({
        autoOpen: true,
        height: 350,
        width: 385,
        modal: true,
        buttons: {
            "Save": function () {
                UpdateProduct(ID);
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    var Url = "http://localhost:1313/Services/ProductService.svc/getProduct/" + ID.toString();
    $.getJSON(Url,
       { get_param: 'value' }, function (data) {
           $.each(data, function (index, element) {
               var product = $.parseJSON(element);
               for (var i = 0; i < product.length; i++) {
                   $("#UpdateProductName").val(product[0].ProductName);
                   $("#UpdateSupplier").val(product[0].CategoryID);
                   $("#UpdateCategoryID").val(product[0].CategoryID);

                   $("#UpdateQuantityPerUnit").val(product[0].QuantityPerUnit);
                   $("#UpdateUnitPrice").val(product[0].UnitPrice);
                   $("#UpdateUnitsInStock").val(product[0].UnitsInStock);
                   $("#UpdateUnitsInOrder").val(product[0].UnitsOnOrder);
                   $("#UpdateReorderedLevel").val(product[0].ReorderLevel);
                   if (product[0].Discontinued.toString() == "true") {
                       $("#UpdateDiscontinued").val(1);
                   }
                   else if (product[0].Discontinued.toString() == "false") {
                       $("#UpdateDiscontinued").val(0);
                   }
               }
           });
       });
}

function UpdateProduct(ID) {

    var ProductName = $("#UpdateProductName").val();
    var Supplier = $("#UpdateSupplier option:selected").val();
    var CategoryId = $("#UpdateCategoryID option:selected").val();
    var QuantityPerUnit = $("#UpdateQuantityPerUnit").val();
    var UnitPrice = $("#UpdateUnitPrice").val();
    var UnitsInStock = $("#UpdateUnitsInStock").val();
    var UnitsInOrder = $("#UpdateUnitsInOrder").val();
    var ReorderedLevel = $("#UpdateReorderedLevel").val();
    var Discontinued = $("#UpdateDiscontinued option:selected").val();

    if (ProductName == "") {
        $("#UpdateWarningText").text("Product Name is mandatory.");
    }
    else if (QuantityPerUnit == "") {
        $("#UpdateWarningText").text("Quantity Per Unit is mandatory.");
    }
    else if (UnitPrice == "") {
        $("#UpdateWarningText").text("Unit Price is mandatory.");
    }
    else if (UnitsInStock == "") {
        $("#UpdateWarningText").text("Units In Stock is mandatory.");
    }
    else if (UnitsInOrder == "") {
        $("#UpdateWarningText").text("Units In Order is mandatory.");
    }
    else if (ReorderedLevel == "") {
        $("#UpdateWarningText").text("Reordered Level is mandatory.");
    }
    else {
        var data = "";
        data += ID;
        data += ";" + ProductName;
        data += ";" + Supplier;
        data += ";" + CategoryId;
        data += ";" + QuantityPerUnit;
        data += ";" + UnitPrice;
        data += ";" + UnitsInStock;
        data += ";" + UnitsInOrder;
        data += ";" + ReorderedLevel;
        data += ";" + Discontinued;

        var Url = "http://localhost:1313/Services/ProductService.svc/updateProduct/" + data.toString();
        $.getJSON(Url,
        { get_param: 'value' }, function (data) {
            $.each(data, function (index, element) {
                alert(element);
                if (element != "An error occurred during this operation.") {
                    $("#UpdateProductDialog").dialog("close");
                    getProducts();
                }
            });
        });
    }
}


