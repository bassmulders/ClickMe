var canvas;

            /*function Meting(datum, waarde)  {
                this.timeStamp = datum;
                this.value = waarde;
            }*/
            function Meting(waarde) {
                this.timeStamp = new Date();
                this.value = waarde;
            }
            var metingen = [];

            SVG = {
                createCanvas : function( width, height, containerId ){
                    var container = document.getElementById(containerId);
                    var canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    canvas.setAttribute('width', width);
                    canvas.setAttribute('height', height);
                    container.appendChild(canvas);
                    return canvas;
                },
                createLine : function (x1, y1, x2, y2, color, w) {
                    var aLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    aLine.setAttribute('x1', x1);
                    aLine.setAttribute('y1', y1);
                    aLine.setAttribute('x2', x2);
                    aLine.setAttribute('y2', y2);
                    aLine.setAttribute('stroke', color);
                    aLine.setAttribute('stroke-width', w);
                    return aLine;
                },
                createCircle : function (cx, cy, r, color) {
                    var aCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    aCircle.setAttribute('cx', cx);
                    aCircle.setAttribute('cy', cy);
                    aCircle.setAttribute('r', r);
                    aCircle.setAttribute('fill', color);
                    return aCircle;
                }
            }

            window.onload = function() {
                canvas = SVG.createCanvas(400, 300, "container");
                drawAxes();
            }

            function drawAxes() {
                drawLine(20, 20, 20, 280);
                drawLine(20, 280, 380, 280);
            }

            function drawLine(x1, y1, x2, y2) {
                canvas.appendChild(SVG.createLine(x1, y1, x2, y2, "black", 1));
            }

            function appendToGraph(index) {
                var x1, y1, x2, y2;

                // Teken bolletje voor het nieuwe meetpunt
                x2 = 20 + index * 10;
                y2 = 280 - metingen[index].value;
                canvas.appendChild(SVG.createCircle(x2, y2, 2, "red"));

                // Teken een lijn tussen het nieuwe en voorgaande bolletje
                if (index > 0) {
                    // Alleen als er tenminste 2 meetpunten zijn kan een lijn getekend worden.
                    x1 = 20 + (index-1) * 10;
                    y1 = 280 - metingen[index - 1].value;
                    drawLine(x1, y1, x2, y2);
                }

            }


            function addMeasurement(msrValue) {
                metingen.push(new Meting(msrValue)); // Voeg nieuwe meetwaarde toe aan array.
                //console.log(metingen.length + " " + metingen[metingen.length - 1].timeStamp + " " + metingen[metingen.length - 1].value);
                appendMeasurementToTable(metingen.length - 1); // Toon nieuwe meetwaarde in tabel
                appendToGraph(metingen.length - 1);
            }



            function appendMeasurementToTable(index) {
                var t = document.getElementById("metingen");
                var r = t.insertRow(t.rows.length);
                var c = r.insertCell(0);
                c.innerHTML = getFormattedDate(metingen[index].timeStamp);
                var c = r.insertCell(1);
                c.innerHTML = metingen[index].value;
            }

            // Thanks to user 'golakers' via http://stackoverflow.com/questions/5416920/timestamp-to-human-readable-format
            function getFormattedDate(date) {

                var month = date.getMonth() + 1;
                var day = date.getDate();
                var hour = date.getHours();
                var min = date.getMinutes();
                var sec = date.getSeconds();

                month = (month < 10 ? "0" : "") + month;
                day = (day < 10 ? "0" : "") + day;
                hour = (hour < 10 ? "0" : "") + hour;
                min = (min < 10 ? "0" : "") + min;
                sec = (sec < 10 ? "0" : "") + sec;

                var str = date.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;

                return str;
            }

            function inputOnKeyPress(e) {
                //alert(e.keyCode);
                if ((e.keyCode < 48 || e.keyCode > 57) && e.keyCode != 13) {
                    alert("Only digits [0...9] are allowed");
                }
                if (e.keyCode === 13) {
                    //e.prevenDefault();
                    //alert('Enter was pressed');
                    addMeasurement(document.getElementById('meting2').value);
                    document.getElementById('meting').value = "";
                } else {
                    if (document.getElementById('meting2').value > 100) {
                        alert("Only vaules of 100 and less are allowed.");
                        e.preventDefault();
                    }
                }
            }