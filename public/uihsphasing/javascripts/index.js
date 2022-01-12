//https://ifelse.info/questions/40/timeline-google-chart-add-slider-picker



$(document).ready(function(){
    // displayState = $("input[name='displayState']:checked").val()
    // $("input[name='displayState_']").click(function(event){
        // displayState = $("input[name='displayState']:checked").val()
        displayState = "cachedImages"  //images, video, cachedImages
        isplayState = "images"
        switch (displayState){
            case 'images':
                if ($('#phaseImage:visible').length == 0){
                    $('#phaseImage').show();
                    
                }
                $('#videoElement').hide();
                break;
            case 'video':
                if ($('#videoElement:visible').length == 0){
                    $('#videoElement').show();
                    
                }
                $('#phaseImage').hide();
                break;
            case 'cachedImages':
                if ($('#phaseImage:visible').length == 0){
                    $('#phaseImage').show();
                    
                }
                $('#videoElement').hide();
                break;
        }
    // })
    

    



    myVideo = document.getElementById('my-video');
    // console.log(myVideo)
    // const vidDuration = myVideo.duration;



    google.charts.load('current', {'packages':['timeline']});
    google.charts.load('current', {'packages':['table']});

    const numImages = 319;
    var currentImage = 0;
    var imageUrls = [];
    
    // preload images
    for (i=0; i<numImages; i++){
        imageUrls.push( formatImageName(i) )
    }
    // console.log(imageUrls)

    function preloadImages(array) {
        if (!preloadImages.list) {
            preloadImages.list = [];
        }
        var list = preloadImages.list;
        for (var i = 0; i < array.length; i++) {
            var img = new Image();
            img.onload = function() {
                var index = list.indexOf(this);
                if (index !== -1) {
                    // remove image from the array once it's loaded
                    // for memory consumption reasons
                    list.splice(index, 1);
                }
            }
            list.push(img);
            img.src = array[i];
        }
    }
    
    if (displayState == "cachedImages"){
        // preloadImages(imageUrls);
    }

    function formatImageName (count){
        result = count.toString();
        // console.log(result)
        if (result.length == 1){
            result = "00" + result
            // console.log(result)
        } else if (result.length == 2){
            result = "0" + result
        } else {
            // console.log("error")
        }
        
        

        result = "images/Frames/" + result + ".jpg"
        return result
    }

    google.charts.setOnLoadCallback(drawChart);
    // google.charts.setOnLoadCallback(drawTable);

    $(window).resize(() =>{
        // console.log(window.innerWidth);
        drawChart();
        // drawTable();
    })

    function DisableHighlighting(){
        $('text').addClass('noselect')
    }

    
    $.get( "https://opensheet.vercel.app/18KEquOxH61YFRpCuSpy5OClQGmjrVLeeica4yaVWE7M/phasing", function(data){
        var list = []
        var headingSelected = false;
        var listpos = 0
        var dataTableArr = []
        var dataTableRowParent = ''
    
        console.log(data)
        data.map((item)=>{
            if (item['Project Start'] != ''){
                // console.log(true)
                if (headingSelected){
                    delete item["Master Plan - Escal. Costs"]
                    delete item["Master Plan - Escal. Costs w/adj. dates"]
                    list[listpos].children.push(item)
                    var dataTableRow = [
                        dataTableRowParent, 
                        item['Project List'],
                        new Date(2022, 4, 1), 
                        new Date(2023, 9, 30)
                    ]
                    if (item['Construction'] != ''){
                        ConvertDate(item['Construction'])
                    }
                    
                }

            } else {
                // console.log(false)
                console.log(item['Project List'])
                headingSelected = true;
                listpos = list.push({ 
                    item: item, 
                    children: []
                }) - 1
                dataTableRowParent = item['Project List']
            }
        })
        
        console.log(list)

        // console.log(splitArr)
        

    })

    function ConvertDate(dateString){
        if (typeof dateString !== "undefined"){
            var month = dateString.substring(0,3)
            var year = dateString.substring(4,6)
            var _month
            var _year = '20'+year;
            switch (month){
                case 'Jan':
                    _month = '01'
                        break;
                case 'Feb':
                    _month = '02'
                    break;
                case 'Mar':
                    _month = '03'
                    break;
                case 'Apr':
                    _month = '04'
                    break;
                case 'May':
                    _month = '05'
                    break;
                case 'Jun':
                    _month = '06'
                    break;
                case 'Jul':
                    _month = '07'
                    break;
                case 'Aug':
                    _month = '08'
                    break;
                case 'Sep':
                    _month = '09'
                    break;
                case 'Oct':
                    _month = '10'
                    break;
                case 'Nov':
                    _month = '11'
                    break;
                case 'Dec':
                    _month = '12'
                    break;
            }
            // if (typeof month !== 'undefined' && typeof _year !== "undefined"){
                console.log(_year+'-'+_month)
            // }
            
        }

    }

    function addSheetsDatatoChart(){
        var _rows = [];
        dataTable.addColumn({ type: 'string', id: 'Facility' });
        dataTable.addColumn({ type: 'string', id: 'Label'})
        dataTable.addColumn({ type: 'date', id: 'Start' });
        dataTable.addColumn({ type: 'date', id: 'End' });
    }



    function drawChart() {
        var container = document.getElementById('timeline');
        var chart = new google.visualization.Timeline(container);
        var dataTable = new google.visualization.DataTable();

        var pA = "Design Procurement"
        var pB = "Construction"
        var pC = "Med EQ / FF&E"
        var pD = "Demo"


        var _rows = [];
        dataTable.addColumn({ type: 'string', id: 'Facility' });
        dataTable.addColumn({ type: 'string', id: 'Label'})
        dataTable.addColumn({ type: 'date', id: 'Start' });
        dataTable.addColumn({ type: 'date', id: 'End' });
        dataTable.addRows([

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            // [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "Demo of MEB", "Design Procurement", new Date(2023, 5), new Date(2024, 9) ],
            // [ "Demo of MEB", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            // [ "Demo of MEB", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "Demo of MEB", "Demo", new Date(2024, 9), new Date(2025, 3) ],

            [ "New Inpatient Tower One", "", new Date(2022, 3), new Date(2029, 2)],

            // [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "Inpatient Tower One", "Design Procurement", new Date(2022, 3), new Date(2024, 9) ],
            [ "Inpatient Tower One", "Construction", new Date(2024, 9), new Date(2028, 6) ],
            [ "Inpatient Tower One", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "Inpatient Tower One", "Demo", new Date(2027, 9), new Date(2029, 1) ],

            // [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "Demo of CDD", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "Demo of CDD", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "Demo of CDD", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "Demo of CDD", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            // [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "Renovation of CDD into Spine", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "Renovation of CDD into Spine", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "Renovation of CDD into Spine", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "Renovation of CDD into Spine", "Demo", new Date(2024, 10), new Date(2027, 4) ],

            // [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "Demo of HPR 1", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "Demo of HPR 1", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "Demo of HPR 1", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "Demo of HPR 1", "Demo", new Date(2024, 10), new Date(2027, 4) ],

            // [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "Demo of Speech and Hearing", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "Demo of Speech and Hearing", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "Demo of Speech and Hearing", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "Demo of Speech and Hearing", "Demo", new Date(2024, 10), new Date(2027, 4) ],

            // [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "Replacement of Speech and Hearing", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "Replacement of Speech and Hearing", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "Replacement of Speech and Hearing", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "Replacement of Speech and Hearing", "Demo", new Date(2024, 10), new Date(2027, 4) ],

            [ "Ambulatory Care Center", "", new Date(2022, 11), new Date(2027, 9)],
            [ "Ambulatory Care Center", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "Ambulatory Care Center", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "Ambulatory Care Center", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "Ambulatory Care Center", "Demo", new Date(2024, 10), new Date(2027, 4) ],

            // [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "Demo of Fieldhouse", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "Demo of Fieldhouse", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "Demo of Fieldhouse", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "Demo of Fieldhouse", "Demo", new Date(2024, 10), new Date(2027, 4) ],

            // [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "UI Replacement Recreation Center", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "UI Replacement Recreation Center", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "UI Replacement Recreation Center", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "UI Replacement Recreation Center", "Demo", new Date(2024, 10), new Date(2027, 4) ],

            [ "Infrastructure", "", new Date(2022, 11), new Date(2027, 9)],
            [ "INF-MedGas Yard", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "INF-MedGas Yard", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "INF-MedGas Yard", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "INF-MedGas Yard", "Demo", new Date(2024, 10), new Date(2027, 4) ],

            // [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "INF-New Roads - NW Connection/Tower 1 Site", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "INF-New Roads - NW Connection/Tower 1 Site", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "INF-New Roads - NW Connection/Tower 1 Site", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "INF-New Roads - NW Connection/Tower 1 Site", "Demo", new Date(2024, 10), new Date(2027, 4) ],

            // [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "INF-New Roads - ACC Site (FTK Way & Grand Ave.)", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "INF-New Roads - ACC Site (FTK Way & Grand Ave.)", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "INF-New Roads - ACC Site (FTK Way & Grand Ave.)", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "INF-New Roads - ACC Site (FTK Way & Grand Ave.)", "Demo", new Date(2024, 10), new Date(2027, 4) ],
/*
            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],

            [ "New Carver College of Medicine Research Tower", "", new Date(2022, 11), new Date(2027, 9)],
            [ "CCoM Research Tower", "Design Procurement", new Date(2022, 11), new Date(2024, 10) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            [ "CCoM Research Tower", "Med EQ / FF&E", new Date(2027, 4), new Date(2027, 9) ],
            [ "CCoM Research Tower", "Construction", new Date(2024, 10), new Date(2027, 4) ],
            */
        ]);

        // for (i=0; i<15; i++){
        //     // data.addColumn('number', 2021 +i);
        //     if (i%2 == 0){
        //         var row = [ 'Washington', new Date(2022, 0, 1), new Date(2022, 9, 1) ]
        //     } else {
        //         var row = [ 'Tubman', new Date(2022, 4, 1), new Date(2023, 7, 1) ]
        //     }
        //     _rows.push(row)
        // }
        // dataTable.addRows(_rows)

        google.visualization.events.addListener(chart, 'select', function () {
            selection = chart.getSelection();
            if (selection.length > 0) {
            // console.log(dataTable.getValue(selection[0].row, 0));
            }
        });
    

        var options = {
            // timeline: { colorByRowLabel: false },
            alternatingRowStyle: true,
            enableInteractivity: false,
            tooltip: {trigger: 'none'},
            // width: 100
            height: getheight(),
            colors: ['#00664F', '#BD472A', '#00AF66', '#00558C'],
            // timeline: {groupByRowLabel: false},
            hAxis: {
                minValue: new Date(2022, 9, 1) ,
                maxValue: new Date(2023, 12, 31) 
            },	
            // colors: ['#cbb69d', '#603913', '#c69c6e']
        };
        chart.draw(dataTable, options);

        // una vez dibujado el timeline, leemos el SVG
        svg = document.querySelector("#timeline svg"); 
        // calculamos los tamaños que debe tener la barra
        // var sizes = svg.querySelector("g:first-of-type path:first-of-type").getAttribute("d").split(",");
        var sizes = $('svg g:first-of-type path:first-of-type').attr('d').split(',')
        bar.style.height = (9*sizes[sizes.length-1])  + "px";
        // y otros valores que nos ayudarán a calcular la nueva fecha más tarde
        min = parseInt(sizes[0].substr(1));
        totalTime = options.hAxis.maxValue - options.hAxis.minValue;
        lengthTime = svg.getAttribute("width") - min;
        initialDate = options.hAxis.minValue;

        $('text').addClass('noselect')
    }

    // las variables que vamos a usar
    var timelineContainer = document.getElementById("timeline-container");
    var bar = document.getElementById("bar");
    var svg = document.querySelector("#timeline svg");
    var offsetLeft = timelineContainer.getBoundingClientRect().left;
    var min = 0;
    var totalTime = 0;
    var lengthTime = 0;

    var mouseDown = 0;
    document.body.onmousedown = function() { 
    ++mouseDown;
    }
    document.body.onmouseup = function() {
    --mouseDown;
    }



    function GetSliderPosition(e){
        if (mouseDown){
            var currentPosition = e.clientX - offsetLeft - min;
            var currentTime = Math.floor(currentPosition * totalTime / lengthTime);
            var dateClicked = new Date(initialDate.getTime() + currentTime);
            var dateClicked_raw = ((e.clientX - offsetLeft - min));
            // console.log(dateClicked_raw);
            // console.log(lengthTime )
            imageStateRatio = dateClicked_raw/ lengthTime
            if (imageStateRatio < 0 ){
                imageStateRatio = 0;
            }

            switch (displayState){
                case 'images':
                    // console.log('images')
                    var imageCount = Math.floor(imageStateRatio * numImages)
                    var url = formatImageName(imageCount)
                    if ($('#phaseImage:visible').length == 0){
                        $('#phaseImage').show();
                        $('#videoElement').hide();
                    }
                    $("#phaseImage").attr("src", url)
                    break;
                case 'video':
                    if ($('#videoElement:visible').length == 0){
                        $('#videoElement').show();
                        $('#phaseImage').hide();
                    }
                    // console.log(imageStateRatio)
                    // myVideo = document.getElementById('my-video')
                    var data = (imageStateRatio * myVideo.duration)
                    var vidPos = parseFloat(data.toFixed(2))
                    myVideo.currentTime = vidPos;
                    
                    // myVideo.fastSeek(vidPos)
                    break;
                case 'cachedImages':
                    // console.log('images')
                    var imageCount = Math.floor(imageStateRatio * numImages)
                    var url = formatImageName(imageCount)
                    if ($('#phaseImage:visible').length == 0){
                        $('#phaseImage').show();
                        $('#videoElement').hide();
                    }
                    try {
                        $("#phaseImage").attr("src", url)
                    } catch (err){
                        
                    }
                    
                    break;
            }



        }
    }

    timelineContainer.addEventListener("mousemove", function(e) {
    var newValue = (e.clientX - offsetLeft);
    if (newValue >= min) {
        if(mouseDown){
            bar.style.left = newValue + "px";
            bar.style.display = "block";
        }

    } else {
        // bar.style.display = "none";
    }  

    GetSliderPosition(e);


    });

    // cuando se pulse en el timeline: calcular fecha correspondiente a la posición pulsada
    timelineContainer.addEventListener("mousedown", function(e) {
    
    // leemos la posición pulsada
    var currentPosition = e.clientX - offsetLeft - min;
    // calculamos el tiempo transcurrido con una regla de tres
    var currentTime = Math.floor(currentPosition * totalTime / lengthTime);
    // añadimos ese tiempo a la fecha/hora inicial
    var dateClicked = new Date(initialDate.getTime() + currentTime);
    
    // Aquí puedes hacer las operaciones que quieras con la nueva fecha
    // console.log(dateClicked);
    });

    function getheight(){
        var _height = $('#chart_row').height();
        return _height
    }

    function drawTable() {
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Activity');
        // data.addColumn('number', 'Salary');
        // data.addColumn('boolean', 'Full Time Employee');
        var _rows = []
        for (i=0; i<15; i++){
            data.addColumn('number', 2021 +i);
            // if (i%2 == 0){
            //     var row = ['Mike',  {v: 10000, f: '$10,000'}, true]
            // } else {
            //     var row = 
            // }
            // _row.push()
        }
        data.addRows([
            ['Mike',  {v: 10000, f: '$10,000'}, true],
        ]);

        var table = new google.visualization.Table(document.getElementById('table_div'));

        table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
    }

})
