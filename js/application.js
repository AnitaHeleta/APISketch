$(document).ready(function(){

    //need NMA API Key
    //https://www.nma.gov.au/about/our-collection/our-apis
    //docs: https://github.com/NationalMuseumAustralia/Collection-API/wiki/Getting-started

    //my API key

    var key = 'aGyOTzAchbsscZt7OnZQ4hSvgSsiW0hW'

    //api call 
    //api call is made to all the objects in the NMA of the Aboriginal Collection
    var url = 'https://data.nma.gov.au/object?limit=&collection=aboriginal&format=simple&apikey=' + key;

    
       $.getJSON(url, function(data) {
        console.log(data);

    //objects title, physical description by collections    
    var item = data.data[0];
    var description = data.data[0];
    

    console.log (item.title);
    console.log (description.physicalDescription);

        $('.title').html (item.title);
        $('.physdesc').html (description.physicalDescription);

    });

});