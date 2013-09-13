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

    //filter and search vars    
    self.filterOptions = ko.observableArray([{value: "ASIN", Name: "ASIN"},
      {value: "LowestNewPrice", Name: "Lowest New Price"},
      {value: "LowestUsedPrice", Name: "Lowest Used Price"},
      {value: "LowestRefurbishedPrice", Name: "Lowest Refurbished Price"},
      {value: "CurrencyCode", Name: "Currency Code"}]);
    
    self.selectedOption = ko.observable("");
    self.filterValue = ko.observable("");

    self.SizeOfAll = ko.observable(0);
    self.PageSize = ko.observable(4);
    self.PageIndex = ko.observable(0);
    
    self.filterValue.subscribe(function(oldValue) {
      self.PageIndex(0);      
    }, null, "beforeChange");
    
    self.PreviousPage = function() {
      self.PageIndex(self.PageIndex() - 1);
    };

    self.NextPage = function() {
      self.PageIndex(self.PageIndex() + 1);
    };

    self.PagedRows = ko.dependentObservable(function() {
      var size = self.PageSize();
      var start = self.PageIndex() * size;
      if (self.filterValue()) {
        start = self.PageIndex() * size;
        var stuff = filter();
        self.SizeOfAll(stuff.length);
        return stuff.slice(start, size + start);
      }
      else {
        self.SizeOfAll(self.AmazonSearchResults().length);
        return self.AmazonSearchResults.slice(start, size + start);
      }
    });

    function filter() {
      return ko.utils.arrayFilter(self.AmazonSearchResults(), function(item) {
        if (self.selectedOption().value == "ASIN")
          return item.ASIN().toLowerCase().indexOf(self.filterValue().toLowerCase()) != -1;
        if (self.selectedOption().value == "LowestNewPrice")
          return item.LowestNewPrice().toString().toLowerCase().indexOf(self.filterValue().toLowerCase()) != -1;
        if (self.selectedOption().value == "LowestUsedPrice")
          return item.LowestUsedPrice().toString().toLowerCase().indexOf(self.filterValue().toLowerCase()) != -1;
        if (self.selectedOption().value == "LowestRefurbishedPrice")
          return item.LowestRefurbishedPrice().toString().toLowerCase().indexOf(self.filterValue().toLowerCase()) != -1;
        if (self.selectedOption().value == "CurrencyCode")
          return item.CurrencyCode().toLowerCase().indexOf(self.filterValue().toLowerCase()) != -1;
      });
    }

    self.MaxPageIndex = ko.dependentObservable(function() {
      return Math.ceil(self.SizeOfAll() / self.PageSize()) - 1;
    });
    
    self.checkForEnter = function(data, event) {
      try {
        if (event.which == 13) {
          AmazonSearch();
          return false;
        }
        return true;
      }
      catch (e)
      {
      }
    };

    self.AmazonSearch = function() {
      AmazonSearch();
    };

    function AmazonSearch() {
      window.location = '/amazonsearch/' + self.searchterms();
    }
  };
  
  var vm = new viewModel();
  ko.applyBindings(vm);
});