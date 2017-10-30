var app = angular.module('homeApp', []);

(function(){
    if (typeof(Storage) !== "undefined") {
        Storage.prototype.setObject = function (key, value) {
            this.setItem(key, JSON.stringify(value));
        };
        Storage.prototype.getObject = function (key) {
            var value = this.getItem(key);
            return value && JSON.parse(value);
        };
    }
})();

app.controller('productCtrl', function($scope, $http) {
    console.log("Inside productCtrl");
    $scope.getProducts = function() {
        console.log("Inside getProducts");
        $http({
            method : "GET",
            url : '/products'
        }).success(function(result) {
            if (result.statusCode == 200) {
                $scope.data = result.data;
            }
            else{

            }
        }).error(function(error) {
            //$scope.unexpected_error = true;
        });
    };
});
app.controller('categoryCtrl', function($scope, $http, Cart) {
    console.log("Inside categoryCtrl");
    $scope.cart = Cart.getCart();
    $scope.showCategories = false;
    $scope.showProducts = false;
    $scope.showCart = false;
    $scope.getCategories = function() {
        console.log("Inside getCategories");
        $scope.showCategories = true;
        $http({
            method : "GET",
            url : '/categories'
        }).success(function(result) {
            if (result.statusCode == 200) {
                $scope.categories = result.data;
            }
            else{

            }
        }).error(function(error) {
            //$scope.unexpected_error = true;
        });
    };
    $scope.getCategories();
    $scope.showCategoryWiseProducts = function(id){
        console.log("Inside showCategoryWiseProducts");
        $scope.showProducts = true;
        $http({
            method : "GET",
            url : '/categories/'+id+'/products/'
        }).success(function(result) {
            if (result.statusCode == 200) {
                $scope.products = result.data;
            }
            else{

            }
        }).error(function(error) {
            //$scope.unexpected_error = true;
        });
    };
    $scope.addItemToCart = function(id, name){
        console.log("Inside addItemsToCart");
        $scope.showCart = true;
        var item = {}
        item.id = id;
        item.name = name;
        item.editing = false;
        item.quantity = 1;
        Cart.addItem(item);
    };

    $scope.editItem = function (item) {
        item.editing = true;
        Cart.changeEditingStatus(item.id, item.editing);
    };

    $scope.doneEditing = function (item) {
        item.editing = false;
        if(item.quantity>1) {
            $scope.updateQuantity(item.id, item.quantity);
        }
        Cart.changeEditingStatus(item.id, item.editing);
        //dong some background ajax calling for persistence...
    };
    $scope.deleteItemFromCart = function (id) {
        console.log("Inside deleteItemFromCart");
        Cart.removeItem(id);
    };

    $scope.updateQuantity = function (id, newQuantity) {
        Cart.changeQuantity(id, newQuantity);
    };

    $scope.emptyCart = function(){
        Cart.clear();
    };

    $scope.$on('cartUpdated', function (event, cart) {
        $scope.cart = cart;
    });

    $scope.order = function(cart){
        console.log("Inside order"+JSON.stringify(cart));
        $http({
            method : "POST",
            data :cart,
            url : '/placeOrder'
        }).success(function (data) {
            console.log("Inside success of signup controller");
            if (data.statusCode != 200) {
                console.log("Failed to process");
            } else {
               console.log("Order placed successfully");
               Cart.clear();
            }
        });
    };
});
app.service('Cart', function ($rootScope) {
    var key = 'cart';
    var self = this;

    //private methods
    var save = function (cart) {
        persist(cart);
    };

    var persist = function (cart) {
        localStorage.setObject(key, cart);
        refresh(cart);
    };

    var refresh = function (cart) {
        $rootScope.$broadcast('cartUpdated', cart);
    };

    var findItemIndexInCart = function (cart, itemId) {
        var itemIndex = -1;
        angular.forEach(cart, function (item, idx) {
            if (item.id == itemId)
                itemIndex = idx;
        });
        return itemIndex;
    };

    self.getCart = function () {
        return localStorage.getObject(key) || [];
    };

    self.addItem = function (item) {
        var cart = self.getCart();
        var itemIndexInCart = findItemIndexInCart(cart, item.id);
        if (itemIndexInCart == -1) {
            //item not found in cart
            cart.push(item);
        } else { //item already present in the cart
            cart[itemIndexInCart].quantity += item.quantity;
        }
        save(cart);
    };

    self.addItems = function (items) {
        angular.forEach(items, function (item) {
            self.addItem(item);
        });
    };

    self.removeItem = function (itemId) {
        console.log("Inside removeItem");
        var cart = self.getCart();
        var itemIndexInCart = findItemIndexInCart(cart, itemId);
        console.log("itemIndexInCart",itemIndexInCart);
        if(itemIndexInCart!==-1) {
            cart.splice(itemIndexInCart, 1);
            save(cart);
        }
    };

    self.clear = function () {
        persist([]);
    };


    self.changeQuantity = function (itemId, newQuantity) {
        var cart = self.getCart();
        var itemIndexInCart = findItemIndexInCart(cart, itemId);
        if(itemIndexInCart!==-1) {
            cart[itemIndexInCart].quantity = newQuantity;
            save(cart);
        }
    };

    self.changeEditingStatus = function (itemId, newStatus) {
        var cart = self.getCart();
        var itemIndexInCart = findItemIndexInCart(cart, itemId);
        if(itemIndexInCart!==-1) {
            cart[itemIndexInCart].editing = newStatus;
            save(cart);
        }
    };
});
app.directive('ngConfirmClick', function() {
    return {
        link: function (scope, element, attr) {
            var msg = attr.ngConfirmClick || "Are you sure?";
            var clickAction = attr.confirmedClick;
            element.bind('click', function (event) {
                if (window.confirm(msg)) {
                    scope.$eval(clickAction)
                }
            });
        }
    };
});