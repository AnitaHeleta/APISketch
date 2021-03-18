$(document).ready(function(){

    //need NMA API Key
    //https://www.nma.gov.au/about/our-collection/our-apis
    //docs: https://github.com/NationalMuseumAustralia/Collection-API/wiki/Getting-started

    //my API key

    var key = 'aGyOTzAchbsscZt7OnZQ4hSvgSsiW0hW'

    //api call 
    //api call is made to all the objects in the NMA of the Aboriginal Collection
    var url = 'https://data.nma.gov.au/object/71110&apikey=' + key;
    
        $.getJSON(url, function(apiData) {
        console.log(apiData);
                    
    $('.title').html (apiData.data[0].title);
    $('.physdesc').html (apiData.data[0].physicalDescription);
    $('.contributor').html (apiData.data[0].contributor[0].title);
    $('.mediumtitle').html (apiData.data[0].medium[0].title);
    $('.significanceStatement').html (apiData.data[0].significanceStatement);


});

});





