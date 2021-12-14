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
        console.log(result)
        if (result.length == 1){
            result = "00" + result
            console.log(result)
        } else if (result.length == 2){
            result = "0" + result
        } else console.log("error")

        result = "images/Frames/" + result + ".jpg"
        return result
    }

    google.charts.setOnLoadCallback(drawChart);
    // google.charts.setOnLoadCallback(drawTable);

    $(window).resize(() =>{
        console.log(window.innerWidth);
        drawChart();
        // drawTable();
    })

    function DisableHighlighting(){
        $('text').addClass('noselect')
    }


    function drawChart() {
        var container = document.getElementById('timeline');
        var chart = new google.visualization.Timeline(container);
        var dataTable = new google.visualization.DataTable();

        var phaseA = "Phase A"
        var phaseB = "Phase B"
        var phaseC = "Phase C"
        var phaseD = "Phase D"

        var label1 = 'Inpatient Tower'
        var label2 = 'Research Tower'
        var label3 = 'Abulatory Care Center'


        var _rows = [];
        dataTable.addColumn({ type: 'string', id: 'Facility' });
        dataTable.addColumn({ type: 'string', id: 'Label'})
        dataTable.addColumn({ type: 'date', id: 'Start' });
        dataTable.addColumn({ type: 'date', id: 'End' });
        dataTable.addRows([
            [ label1, phaseA, new Date(2022, 4, 1), new Date(2023, 9, 30) ],
            [ label1, phaseB, new Date(2023, 10, 1), new Date(2028, 6, 30) ],
            [ label1, phaseC, new Date(2028, 8, 1), new Date(2029, 7, 31) ],
            [ label1, phaseD, new Date(2022, 9, 1), new Date(2023, 12, 31) ],
            [ label2, phaseA, new Date(2023, 6, 1), new Date(2024, 11, 30) ],
            [ label2, phaseB, new Date(2024, 12, 1), new Date(2027, 5, 31) ],
            [ label2, phaseC, new Date(2027, 6, 1), new Date(2027, 10, 31) ],
            [ label2, phaseD, new Date(2022, 7, 1), new Date(2024, 11, 30) ],
            [ label3, phaseA, new Date(2025, 8, 1), new Date(2027, 6, 30) ],
            [ label3, phaseB, new Date(2027, 7, 1), new Date(2030, 3, 31) ],
            [ label3, phaseC, new Date(2030, 4, 1), new Date(2030, 6, 30) ],
            [ label3, phaseD, new Date(2021, 10, 1), new Date(2023, 3, 31) ]
            
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
            console.log(dataTable.getValue(selection[0].row, 0));
            }
        });
    

        var options = {
            // timeline: { colorByRowLabel: false },
            alternatingRowStyle: true,
            enableInteractivity: false,
            tooltip: {trigger: 'none'},
            // width: 100
            height: getheight(),
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
                    console.log('images')
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
                    console.log('images')
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
    console.log(dateClicked);
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
