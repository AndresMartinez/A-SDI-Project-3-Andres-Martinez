var forIform = function(data){
   alert("here is your data "+data);
};
$(document).ready(function(){
    var iform=$('#Form'),
        fperrorslink = $('#fperrorslink');
    
    iform.validate({
        invalidHandler: function(form, validator){
            fperrorslink.click();
            var html = '';
            for (var key in validator.submitted){
                var label=$('label[for^="'+key+'"]').not('[generated]');
                var legend=label.closest('fieldset').find('.ui-controlgroup-label');
                var fieldname = legend.length ? legend.text() : label.text();
                html += '<li>' + fieldname +'</li>';
            };
            $("#formpageerrors ul").html(html);
        },
        submitHandler: function(){
            var data = iform.serializeArray();
            alert("form submitted");
            forIForm(data);
        }
    });
});










var num = 1;
var currentEditId;




function loadPage(){
	
	var i = localStorage.length;
	
	
	$('.submissions').append('<div class="topLocalS"></div>');
	$('.topLocalS').append('<h2>Local Storage Data</h2>');
	
	for (var i = 0, len = localStorage.length; i  <=  len; i++)  
    {
    	 	
        var key = localStorage.key(i);  
        var val = localStorage.getItem(key);
        
        if(val != null){
        	val = val.split(';');  
       
			$('.topLocalS').append('<div class=\"entry' + key + '\" id=\"inputDiv\"></div>');
			
			$('.entry' + key).append('<label id="label">Category: </label><p id=\"catName' + key + '\">' + val[0] + '</p>');
			$('.entry' + key).append('<label id="label">Assignment: </label><p id=\"itemName' + key + '\">' + val[1] + '</p>');
			$('.entry' + key).append('<label id="label">Time: </label><p id=\"itemQty' + key + '\">' + val[2] + '</p>');
			$('.entry' + key).append('<label id="label">Due: </label><p id=\"due' + key + '\">' + val[3] + '</p>');
			$('.entry' + key).append('<label id="label">Notes: </label><p id=\"notes' + key + '\">' + val[4] + '</p>');							
			$('.entry' + key).append('<input type="button" value="Edit" onclick="editData(' + key + ');"/>');
			$('.entry' + key).append('<input type="button" value="Delete" onclick="deleteData(' + key + ');"/>');
		};	
    }  	

		
};




function storeData(ifnum){
        if (ifnum == 1){
        	
        	var curDate = new Date();
			var itemID = curDate.getTime();
			
			var catName = $('#catName').val();
			var itemName = $('#itemName').val();
			var itemQty = $('#itemQty').val();
			var due = $('#due').val();
			var notes = $('#notes').val();
			
			var allItems = [
				catName,
				itemName,
				itemQty,
				due,
				notes
			];
			
			
			if (itemName != ""){
				localStorage.setItem(itemID, allItems.join(';'));
			};
			
			

			$('.topLocalS').append('<div class=\"entry' + itemID + '\" id=\"inputDiv\" ></div>');
			
			$('.entry' + itemID).append('<label id="label">Category: </label><p id=\"catName' + itemID + '\">' + allItems[0] + '</p>');
			$('.entry' + itemID).append('<label id="label">Assignment: </label><p id=\"itemName' + itemID + '\">' + allItems[1] + '</p>');
			$('.entry' + itemID).append('<label id="label">Time: </label><p id=\"itemQty' + itemID + '\">' + allItems[2] + '</p>');
			$('.entry' + itemID).append('<label id="label">Due: </label><p id=\"due' + itemID + '\">' + allItems[3] + '</p>');
			$('.entry' + itemID).append('<label id="label">Notes: </label><p id=\"notes' + itemID + '\">' + allItems[4] + '</p>');
			$('.entry' + itemID).append('<p><input type="button" value="Edit" onclick="editData(' + itemID + ');"/>');
			$('.entry' + itemID).append('<input type="button" value="Delete" onclick="deleteData(' + itemID + ');"/></p>');
			
						$(':input','#myForm').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
			$('#itemQty').val(30);
		                
        } else {
			
				var catName = 	$('#catName').val();
				var itemName = $('#itemName').val();
				var itemQty = $('#itemQty').val();
				var due = $('#due').val();
				var notes = $('#notes').val();
				
				var allItems = [
					catName,
					itemName,
					itemQty,
					due,
					notes
				];
				
				
				if (itemName != ""){
					localStorage.setItem(currentEditId, allItems.join(';'));
				};
				
			
			$('#catName' + currentEditId).text(catName);
			$('#itemName' + currentEditId).text(itemName);
			$('#itemQty' + currentEditId).text(itemQty);
			$('#due' + currentEditId).text(due);
			$('#notes' + currentEditId).text(notes);

            $('#sub').parent().find('.ui-btn-text').text('Submit');
            num = 1;
                       
            
           
			$(':input','#myForm').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
			$('#itemQty').val(30);
            
        };
};



function editData(id){
	var value = localStorage.getItem(id);
	value = value.split(';');
	
	$('#catName').val(value[0]);
	$('#itemName').val(value[1]);
	$('#itemQty').val(value[2]);
	$('#due').val(value[3]);
	$('#notes').val(value[4]);
	
	currentEditId = id;
		$('#sub').parent().find('.ui-btn-text').text('Edit');
	
	num = 2;
	
	
	$('html, body').animate({ scrollTop: 0 }, 0);
};




function clearLocal() {
	localStorage.clear(); 
	location.reload(true);
} 


function deleteData(id) { 
	var ask = confirm("Are you sure?");
	if (ask) {
		localStorage.removeItem(id); 
		location.reload(true); 
	} else {
		alert("Item not removed!");
	}
	
	$('html, body').animate({ scrollTop: 0 }, 0);
}



function loadJSON(){
	
	var jData = 1;
	$.ajax({
		url: 'data.js',
		type: 'GET',
		dataType: 'json',
		success: function(data){
		
		$('.submissions').append('<div class="topJSON"></div>');
		
		$('.topJSON').append('<h2>JSON Data</h2>');
		
		
			$.each(data.items, function(){
				
				var itJdata = "json" + jData;
				
    			
				
				var entry = this;
				$('.topJSON').append('<div class=' + itJdata + ' id=\"inputDiv\"></div>');
				
			  $('.' + itJdata).append('<label id="label">Category: </label> <p>' + entry.catName + '</p>'
    			+ '<label id="label">Workout: </label> <p>' + entry.itemName + '</p>' + '<label id="label">Reps: </label> <p>' + entry.itemQty + '</p>' + '<label id="label">Favorite: </label> <p>' + entry.due + '</p>' + '<label id="label">: </label> <p>' + entry.notes + '</p>');
    			jData++;
    			
		})}

	})
};




	
	
function loadXML(){	
	var xmlData = 1;
	$.ajax({
		url: 'data.xml',
		type: 'GET',
		dataType: 'xml',
		success: function(data){
		
		$('.submissions').append('<div class="topXML"></div>');
		
		$('.topXML').append('<h2>XML Data</h2>');
		
			$(data).find("item").each(function(){
				
				var itXmlData = "xml" + xmlData;
				
    			
								var entry = this;
				$('.topXML').append('<div class=' + itXmlData + ' id=\"inputDiv\"></div>');
				
			  $('.' + itXmlData).append('<label id="label">Category: </label> <p>' + $(entry).find("catName").text() + '</p>'
    			+ '<label id="label">Workout: </label> <p>' + $(entry).find("itemName").text() + '</p>' + '<label id="label">Reps: </label> <p>' + $(entry).find("itemQty").text() + '</p>' + '<label id="label">Favorite: </label> <p>' + $(entry).find("due").text() + '</p>' + '<label id="label">: </label> <p>' + $(entry).find("notes").text() + '</p>');
    			xmlData++;
    			
		})}

	})	
};	
	
	function loadCSV(){	
	var csvData = 1;
	$.ajax({
		url: 'data.csv',
		type: 'GET',
		data: null,
		success: function(data){
		
		$('.submissions').append('<div class="topCSV"></div>');
		
		$('.topCSV').append('<h2>CSV Data</h2>');
		
		
		var lines = data.split('\n');

		for (var lineNum = 0; lineNum < lines.length; lineNum++) {
			
			var itCsvData = "csv" + csvData;
		    
		    var row = lines[lineNum];
		    var columns = row.split(",");
		    
		    var labels = [
		    	"Category: ",
		    	"Workout: ",
		    	"Reps: ",
		    	"Favorite: ",
		    	": "
		    ]
		    $('.topCSV').append('<div class=' + itCsvData + ' id=\"inputDiv\"></div>');
		    		    for (var entry in columns ){
		    
		    $('.' + itCsvData).append('<label id="label">' + labels[entry] +'</label> <p>' + columns[entry] + '</p>');
			    }
			csvData++;    
		} 
		
		
		}

	})	
};




