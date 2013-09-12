$(function() {
  var item = function(data) {
    var self = this;
    self.ASIN = ko.observable(data.ASIN);
    self.LowestNewPrice = ko.observable(data.LowestNewPrice);
    self.LowestUsedPrice = ko.observable(data.LowestUsedPrice);
    self.LowestRefurbishedPrice = ko.observable(data.LowestRefurbishedPrice);
    self.CurrencyCode = ko.observable(data.CurrencyCode);
    self.DetailPageURL = ko.observable(data.DetailPageURL);
    self.SmallImageURL = ko.observable(data.SmallImageURL);
  };

  var viewModel = function() {
    var self = this;
    
    self.searchterms = ko.observable(searchterms);
    
    searchresults = searchresults.replace(/&quot;/g, '"');
    searchresults = searchresults.substring(1);
    searchresults = searchresults.substring(0, searchresults.length - 1);
    searchresults = JSON.parse(searchresults);

    self.AmazonSearchResults = ko.observableArray([]);
    var searchResultsMapped = [];
    $.each(searchresults.Items.Item, function(key, value) {
      var LowestNewPrice = value.OfferSummary.LowestNewPrice;
      var LowestUsedPrice = value.OfferSummary.LowestUsedPrice;
      var LowestRefurbishedPrice = value.OfferSummary.LowestRefurbishedPrice;
      var element = new item({"ASIN": value.ASIN, "LowestNewPrice": LowestNewPrice ? (LowestNewPrice.Amount / 100) : 'NA', "LowestUsedPrice": LowestUsedPrice ? (LowestUsedPrice.Amount / 100) : 'NA', "LowestRefurbishedPrice": LowestRefurbishedPrice ? (LowestRefurbishedPrice.Amount / 100) : 'NA', "CurrencyCode": LowestNewPrice ? LowestNewPrice.CurrencyCode : LowestUsedPrice ? LowestUsedPrice.CurrencyCode : LowestRefurbishedPrice ? LowestRefurbishedPrice.CurrencyCode : 'NA', "DetailPageURL": value.DetailPageURL, "SmallImageURL": value.SmallImage.URL});      
      searchResultsMapped.push(element);
    });
    
    self.AmazonSearchResults(searchResultsMapped);
  };

  var vm = new viewModel();
  ko.applyBindings(vm);
});