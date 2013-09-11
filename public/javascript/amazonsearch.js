$(function() {
  var item = function(data) {
    var self = this;
    self.ASIN = ko.observable(data.UniqueIdentifier);
    self.LowestNewPrice = ko.observable(data.LowestNewPrice);
    self.LowestUsedPrice = ko.observable(data.LowestUsedPrice);
    self.LowestRefurbishedPrice = ko.observable(data.LowestRefurbishedPrice);
    self.CurrencyCode = ko.observable(data.CurrencyCode);
    self.DetailPageURL = ko.observable(data.DetailPageURL);
    self.SmallImageURL = ko.observable(data.SmallImageURL);
  };

  var viewModel = function() {
    var self = this;
    
    self.AmazonSearchResults = ko.observableArray([]);
  };

  var vm = new viewModel();
  ko.applyBindings(vm);
});