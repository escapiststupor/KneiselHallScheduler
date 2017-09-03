$(document).ready(function() {
    //start document.ready


    var violin = [],
        viola = [],
        cello = [],
        piano = [],
        bass = [];
    var groups = [],
        coachDays = [],
        coachMWTime = [],
        coachTTTime = [],
        rehearsalTime = [];
    var rehearsalStudio = [],
        coachMWStudio = [],
        coachTTStudio = [];
    var rehearsalTimeTable = []; // 3 elements: the time slots
    var coachingMWTimeTable = [], coachingTTTimeTable = []; // 3 elements: the time slots


    var G1 = [];
    var G2 = [];
    var worksMW = [];
    var G3 = [];
    var worksTT = [];
    // Intro (#pagebox0)
    // Click on proceed to go to pagebox1

    $("#pagebox0 .proceed").on("click", function(event) {
        $("#pagebox0").remove();
        $("#pagebox1").css("display", "initial");
    });



    // Step 1 (#pagebox1)
    // Click on X to delete student


    $("#pagebox1 ul").on("click", "span", function(event) {
        $(this).parent().fadeOut(500, function() {
            $(this).remove();
        });
        event.stopPropagation();
    });

    $("#pagebox1 input[type='text']").keydown(function(event) {
        if (event.which == '13' && (/[^\s+$]/.test($(this).val()))) {
            event.preventDefault();
            // Grabbing the new student from input
            var student = $(this).val();
            $(this).val("");
            // creat new li and add to ul
            $(this).next().append("<li><span><i class='fa fa-trash'></i></span>" + student + "</li>");
        }
    });




    $("#pagebox1 .proceed").on("click", function(event) {

        var vnList = $("div.vn li");
        for (var i = 0; i < vnList.length; i++) {
            violin.push(vnList[i].innerText);
        }
        var vaList = $("div.va li");
        for (var i = 0; i < vaList.length; i++) {
            viola.push(vaList[i].innerText);
        }
        var vcList = $("div.vc li");
        for (var i = 0; i < vcList.length; i++) {
            cello.push(vcList[i].innerText);
        }
        var pnList = $("div.pn li");
        for (var i = 0; i < pnList.length; i++) {
            piano.push(pnList[i].innerText);
        }
        var bsList = $("div.bs li");
        for (var i = 0; i < bsList.length; i++) {
            bass.push(bsList[i].innerText);
        }
        violin.sort();
        viola.sort();
        cello.sort();
        piano.sort();
        bass.sort();

        var r = confirm(`There are ${violin.length} violinists, ${viola.length} violists, ${cello.length} cellists, ${piano.length} pianists, and ${bass.length} bassist. Is that correct?`);
        if (r == true) {
            $("#pagebox1").remove();
            $("#pagebox2").css("display", "initial");
        } else {
            alert("Be sure to correct the list before continue!");
            violin = [];
            viola = [];
            cello = [];
            piano = [];
            bass = [];
        }


    });

    // Step 2 (#pagebox2)
    // Click on X to delete coach

    $("#pagebox2 ul").on("click", "span", function(event) {
        $(this).parent().fadeOut(500, function() {
            $(this).remove();
        });
        event.stopPropagation();
    });

    $("#pagebox2 input[type='text']").keydown(function(event) {
        if (event.which == '13' && (/[^\s+$]/.test($(this).val()))) {
            event.preventDefault();
            // Grabbing the new student from input
            var coach = $(this).val();
            $(this).val("");
            // creat new li and add to ul
            $(this).next().append("<li><span><i class='fa fa-trash'></i></span>" + coach + "</li>");
        }
    });


    var coachMW = [],
        coachTT = [],
        coaches = [];

    $("#pagebox2 .proceed").on("click", function(event) {

        var coachMWList = $("div.MW li");

        for (var i = 0; i < coachMWList.length; i++) {
            coachMW.push(coachMWList[i].innerText);
        }

        var coachTTList = $("div.TT li");
        for (var i = 0; i < coachTTList.length; i++) {
            coachTT.push(coachTTList[i].innerText);
        }

        coachMW.sort();
        coachTT.sort();

        var r = confirm(`There are ${coachMW.length} coaches on M/W, ${coachTT.length} on T/Th. Is that correct?`);
        if (r == true) {
            coaches = arrayUnique(coachMW.concat(coachTT));
            $("#pagebox2").remove();
            $("#pagebox3").css("display", "initial");
        } else {
            alert("Be sure to correct the list before continue!");
            coachMW = [],
            coachTT = [],
            coaches = [];
        }

        
    });


    // Step 3 (#pagebox3): get repertoire


    $("#pagebox3 ul").on("click", "span", function(event) {
        $(this).parent().fadeOut(500, function() {
            $(this).remove();
            var numofworks = $("div.rep li").length;
            $("#pagebox3 h2 span").html(numofworks);
        });
        event.stopPropagation();
    });

    $("#pagebox3 input[type='text']").keydown(function(event) {
        if (event.which == '13' && (/[^\s+$]/.test($(this).val()))) {
            event.preventDefault();
            // Grabbing the new student from input
            var piece = $(this).val();
            $(this).val("");
            // creat new li and add to ul
            $(this).next().append("<li><span><i class='fa fa-trash'></i></span>" + piece + "</li>");
            var numofworks = $("div.rep li").length;
            $("#pagebox3 h2 span").html(numofworks);

        }
    });



    var works = [];


    $("#pagebox3 .proceed").on("click", function(event) {

            var workList = $("div.rep li");
            for (var i = 0; i < workList.length; i++) {
                works.push(workList[i].innerText);
            }

            $("#pagebox3").remove();
            $("#pagebox4").css("display", "initial");


            var nextPersonCounter = 0;
            groups[nextPersonCounter] = [];
            var findnext = false;
            $("#pagebox4 .fillgroup h1").text('- Who is in ' + works[nextPersonCounter]);

            var maxPerson = Math.max(coaches.length, violin.length, viola.length, cello.length, bass.length, piano.length);
            // Add buttons of all people

            for (var i = 0; i < maxPerson; i++) {
                var buttonGroup = document.createElement("tr");
                var buttons = document.createElement("td");

                if (coaches[i]) {
                    buttons.classList += "Person";
                    buttons.innerHTML = coaches[i];
                    buttons.onclick = function() {
                        selectPerson(this);
                    };
                } else {
                    buttons.innerHTML = '';
                }

                buttonGroup.appendChild(buttons);

                //-----
                buttons = document.createElement("td");
                if (violin[i]) {
                    buttons.classList += "Person";
                    buttons.innerHTML = violin[i];
                    buttons.onclick = function() {
                        selectPerson(this);
                    };
                } else {
                    buttons.innerHTML = '';
                }

                buttonGroup.appendChild(buttons);
                //-----
                buttons = document.createElement("td");
                if (viola[i]) {
                    buttons.classList += "Person";
                    buttons.innerHTML = viola[i];
                    buttons.onclick = function() {
                        selectPerson(this);
                    };
                } else {
                    buttons.innerHTML = '';
                }

                buttonGroup.appendChild(buttons);
                //-----
                buttons = document.createElement("td");
                if (cello[i]) {
                    buttons.classList += "Person";
                    buttons.innerHTML = cello[i];
                    buttons.onclick = function() {
                        selectPerson(this);
                    };
                } else {
                    buttons.innerHTML = '';
                }

                buttonGroup.appendChild(buttons);
                //-----
                buttons = document.createElement("td");
                if (piano[i]) {
                    buttons.classList += "Person";
                    buttons.innerHTML = piano[i];
                    buttons.onclick = function() {
                        selectPerson(this);
                    };
                } else {
                    buttons.innerHTML = '';
                }

                buttonGroup.appendChild(buttons);
                //-----
                buttons = document.createElement("td");
                if (bass[i]) {
                    buttons.classList += "Person";
                    buttons.innerHTML = bass[i];
                    buttons.onclick = function() {
                        selectPerson(this);
                    };
                } else {
                    buttons.innerHTML = '';
                }



                var selectPerson = function(buttons) {
                    buttons.classList.toggle("selectedPerson");
                    if (($("#pagebox4 .fillgroup ul")[0].innerText).includes(buttons.innerText + ',')) {
                        ($("#pagebox4 .fillgroup ul")[0].innerText) = ($("#pagebox4 .fillgroup ul")[0].innerText).replace(buttons.innerText + ',', '');
                        groups[nextPersonCounter].splice(groups[nextPersonCounter].indexOf(buttons.innerText), 1);
                    } else {
                        $("#pagebox4 .fillgroup ul")[0].innerText += ' ' + buttons.innerText + ',';
                        groups[nextPersonCounter].push(buttons.innerText);
                    }
                };


                buttonGroup.appendChild(buttons);


                $("#pagebox4 #personTable")[0].appendChild(buttonGroup);


            } //end building personTable

            submit = document.createElement("button");
            submit.innerHTML = 'submit';
            $("#pagebox4 .fillgroup")[0].appendChild(submit);

            submit.onclick = nextPerson;

            function nextPerson() {


                findnext = true;
                nextPersonCounter++;
                groups[nextPersonCounter] = [];
                while (findnext && nextPersonCounter < works.length) {
                    $("#pagebox4 .fillgroup h1").text('- Who is in ' + works[nextPersonCounter]);
                    $("#personTable .Person").removeClass("selectedPerson");
                    $("#pagebox4 .fillgroup ul")[0].innerText = 'Group members: ';
                    findnext = false;
                }

                while (findnext && nextPersonCounter == works.length) {
                    groups.pop();
                    $("#pagebox4 .proceed").css("display", "initial");
                    findnext = false;
                    $("#pagebox4 #personTable").remove();
                    $("#pagebox4 .fillgroup").remove();
                    $("#pagebox4 p").remove();
                }

            }



        } //end onclick
    );



    // Step 4 (#pagebox4) Who's playing what


    $("#pagebox4 .proceed").on("click", function() {
        //只準按一下
        $("#pagebox4 .proceed").prop('disabled', true);
        $("#pagebox4").remove();


        // 放在某個onclick裡面
        // Sort groups, so the coach is the first element

        for (let i = 0; i < groups.length; i++) {
            // loop over all groups, remove the coach
            for (let j = 0; j < groups[i].length; j++) {
                if (coaches.indexOf(groups[i][j]) != -1) { // if groups[i][j] is a coach
                    groups[i].unshift(groups[i][j]);
                    groups[i] = arrayUnique(groups[i]);
                }
            }
        }
        console.log('there are ',groups.length,' groups, being ',groups);
        console.log('Start scheduling...');

        // ========SCHEDULE REHEARSALS===========

        // G is adjacency matrix

        // building G1
        for (let i = 0; i < groups.length; i++) {
            G1[i] = [];
            for (let j = 0; j < groups.length; j++) {
                if (G1hasSamePerson(groups[i], groups[j])) {
                    G1[i][j]=1;
                } else {
                    G1[i][j]=0;
                }
                if (i==j){G1[i][j]=0;}
            }
        }
        // end building G1

        function G1hasSamePerson(A_, B_) { // A & B are array
            // cut the coach, ignore him
            var A=A_.slice(1);
            var B = B_.slice(1);
            return (arrayUnique(A.concat(B)).length !== A.concat(B).length);
        }//end G1hasSamePerson
        

        console.log('G1 is ',G1);
        rehearsalTime[0] = tryMScheduling(G1);
        rehearsalTime[1] = Math.max(...rehearsalTime[0]);
        console.log('rehearsalTime is ',rehearsalTime[0]);
        console.log('Maximum timeslot needed for rehearsals: ',rehearsalTime[1]);
        console.log('==============');
        // ========SCHEDULE MW / TT COACHINGS===========



        //building worksMW, worksTT, and coachDays
        for (let i = 0; i < works.length; i++) {
            if (coachMW.indexOf(groups[i][0]) == -1) {
                coachDays.push('TT');
                worksTT.push(works[i]);
            } else {
                coachDays.push('MW');
                worksMW.push(works[i]);
            }
        }
        // end


        // building G2
        for (let i = 0; i < worksMW.length; i++) {
            G2[i] = [];
            for (let j = 0; j < worksMW.length; j++) {
                if (hasSamePerson(groups[works.indexOf(worksMW[i])], groups[works.indexOf(worksMW[j])])) {
                    G2[i][j]=1;
                } else {
                    G2[i][j]=0;
                }
                if (i==j){G2[i][j]=0;}
            }
        }
        // end building G2

        // building G3
        for (let i = 0; i < worksTT.length; i++) {
            G3[i] = [];
            for (let j = 0; j < worksTT.length; j++) {
                if (hasSamePerson(groups[works.indexOf(worksTT[i])], groups[works.indexOf(worksTT[j])])) {
                    G3[i][j]=1;
                } else {
                    G3[i][j]=0;
                }
                if (i==j){G3[i][j]=0;}
            }
        }
        // end building G3

        function hasSamePerson(A, B) { // A & B are array
            return (arrayUnique(A.concat(B)).length !== (A.concat(B)).length);
        }

        console.log('G2 is ',G2);
        coachMWTime[0] = tryMScheduling(G2);
        coachMWTime[1] = Math.max(...coachMWTime[0]);
        console.log('coachMWTime is ',coachMWTime[0]);
        console.log('Maximum timeslot needed for MW coachings: ',coachMWTime[1]);
        console.log('==============');
        console.log('G3 is ',G3);
        coachTTTime[0] = tryMScheduling(G3);
        coachTTTime[1] = Math.max(...coachTTTime[0]);
        console.log('Maximum timeslot needed for TT coachings: ',coachTTTime[1]);
        console.log('coachTTTime is ',coachTTTime[0]);
        console.log('==============');

        // ========STORE THE FUNCTOIN HERE===========

function tryMScheduling(G){
    var numOfColor=3;// start trial from 3 colors
    var answer=[];
    answer=scheduling(G,numOfColor);
    // 若三種顏色不能塗
    while (!answer){
        answer=scheduling(G,numOfColor+1);          
    }
    return answer;


        function scheduling(G,numOfColor){
// http://www.geeksforgeeks.org/backttracking-set-5-m-coloring-problem/
          // The Greedy Algorithm
          // var works = ['piece1', 'piece2', 'piece3', 'piece4'];
          // var G = [[0,1,1,0],[1,0,1,1],[1,1,0,1],[0,1,1,0]];
          var color=[];
          /* M Coloring problem
             using backtracking */

            /* A utility function to check if the current color assignment is safe for vertex v */
            function isSafe(v, G, color, c){
//            console.log('color vertex no.',v+1,' with color no.'+c);
              for (let i = 0; i < G.length; i++){
                if (G[v][i] == 1 && c == color[i]){

//                console.log('CONFLICT! oops this color does not work, go back');
                  return false;
                  }
                }
//            console.log('success! safe to color');
              return true;
            }//end isSafe
            
            /* A recursive utility function to solve m
               coloring  problem */
            function GColoringUtil(G,numOfColor,color,v){
              /* base case: If all vertices are assigned
                 a color then return true */
              if (v == G.length){
                console.log('ALL COLORED');
                return true;
              }
                
              /* Consider this vertex v and try different colors */
              for (var c = 1; c <= numOfColor; c++){
                  /* Check if assignment of color c to v is fine*/
//                console.log('trying to color the ',v+1,'th vertex....');
                  if (isSafe(v, G, color, c)){
                    color[v] = c;
                    /* recur to assign colors to rest of the vertices */
                    if (GColoringUtil(G, numOfColor, color, v+1)){
                      return true;
                    }
                    /* If assigning color c doesn't lead to a solution then remove it */
                    color.pop();
                  }//end isSafe
//                console.log('tried all the colors, cannot!');
              }//end trying the colors for loop
              /* If no color can be assigned to this vertex then return false */
              return false;
            }//end GColoringUtil
            
            /* This function solves the m Coloring problem using
               Backtracking. It mainly uses GColoringUtil()
               to solve the problem. It returns false if the m
               colors cannot be assigned, otherwise return true
               and  prints assignments of colors to all vertices.
               Please note that there  may be more than one
               solutions, this function prints one of the
               feasible solutions.*/
            function GColoring(G, numOfColor){ //returns the array color
              // Initialize all color values as 0. This
              // initialization is needed correct functioning
              // of isSafe()
              for (let i = 0; i < G.length; i++){color[i] = 0;}
              // Call GColoringUtil() for vertex 0
              if (!GColoringUtil(G, numOfColor, color, 0)){
                return false;
              }
              // if solution exists, return color!
              return color;
            }
            return GColoring(G, numOfColor); // 
          
        }// end scheduling

} //end tryMScheduling

        //把#pagebox5的內容搞定
        // 先生成ul
        for (var k=0;k<rehearsalTime[1];k++){     
            var aul=document.createElement("ul"); 
            var atimeslot = document.createElement("h2");
            var thetime=k+1; // change to 1 based not 0 based
            atimeslot.innerText='Time Slot '+thetime;
            var itsplaceholder = document.createElement("input");
            itsplaceholder.classList += "slotTime";
            itsplaceholder.type = "text";
            itsplaceholder.placeholder = "please click here to enter the exact time";
            aul.appendChild(atimeslot);
            aul.appendChild(itsplaceholder);
            $("#pagebox5 .container")[0].appendChild(aul);
        }         

        //ul底下該有的list和按鈕都在這
        for (let i = 0; i < rehearsalTime[0].length; i++) {//對每個work製造一行
            var apiece = document.createElement("li");
            var left = document.createElement("div");
            left.classList += "left";
            left.innerHTML = works[i];
            var right = document.createElement("div");
            right.classList += "right";
            right.innerHTML = '<input type="text" class="studio" placeholder="click to enter studio">';
            apiece.appendChild(left);
            apiece.appendChild(right);
            $("#pagebox5 ul")[rehearsalTime[0][i] - 1].appendChild(apiece);
        }

        $("#pagebox5 input[type='text']").keydown(function(event) {
            if (event.which == '13' && (/[^\s+$]/.test($(this).val()))) {
                event.preventDefault();
                // Grabbing the new student from input
                $(this).blur();
            }
        });


        // display the rehearsal info to #pagebox5
        $("#pagebox5").css("display", "initial");

    });




    // Step 5 (#pagebox5) fill in rehearsal time and studio



    $("#pagebox5 .proceed").on("click", function(event) {

        if ($("#pagebox5 input").filter(function() {
                return $.trim($(this).val()).length == 0
            }).length) {
            alert('Please make sure all the fields are filled!');
        } else {
            ////////////////////////////////////////////////
            // Grab rehearsalStudio and rehearsalTimeTable


            //先抓那個rehearsal時間
            for (i = 0; i < rehearsalTime[1]; i++) {
                rehearsalTimeTable[i] = $("#pagebox5 input.slotTime")[i].value;
            }

            //再來抓那個rehearsal地點
            var slotlist=0; //抓studio的指標
            for (var t=1;t<=rehearsalTime[1];t++){ //檢查到底落在1.2.3..哪個時段
                for (var i = 0; i < works.length; i++) {//第i組
                    if (rehearsalTime[0][i] == t) { // 如果第i組在第t個時段有rehearsal
                        rehearsalStudio[i] = $("#pagebox5 input.studio")[slotlist].value;
                        slotlist++;
                    }
                } //end 檢查所有組
            } // end 檢查所有時段



            // dynamically generate the content of #pagebox6

            //先生成ul

            for (var k=0;k<coachMWTime[1];k++){     
                var aul=document.createElement("ul"); 
                var atimeslot = document.createElement("h2");
                var thetime=k+1; // change to 1 based not 0 based
                atimeslot.innerText='Time Slot '+thetime;
                var itsplaceholder = document.createElement("input");
                itsplaceholder.classList += "slotTime";
                itsplaceholder.type = "text";
                itsplaceholder.placeholder = "please click here to enter the exact time";
                aul.appendChild(atimeslot);
                aul.appendChild(itsplaceholder);
                $("#pagebox6 .container")[0].appendChild(aul);
            }      

            //再生成ul下面的東西

            for (let i = 0; i < coachMWTime[0].length; i++) {
                var apiece = document.createElement("li");

                var left = document.createElement("div");
                left.classList += "left";
                left.innerHTML = worksMW[i] + ' | ' + groups[works.indexOf(worksMW[i])][0];
                var right = document.createElement("div");
                right.classList += "right";
                right.innerHTML = '<input type="text" class="studio" placeholder="click to enter studio">';
                apiece.appendChild(left);
                apiece.appendChild(right);
                $("#pagebox6 ul")[coachMWTime[0][i] - 1].appendChild(apiece);
            }

            $("#pagebox6 input[type='text']").keydown(function(event) {
                if (event.which == '13' && (/[^\s+$]/.test($(this).val()))) {
                    event.preventDefault();
                    // Grabbing the new student from input
                    $(this).blur();
                }

            });
            ////////////////////////////////////////////////
        $("#pagebox5").remove();
        $("#pagebox6").css("display", "initial");

        }


    });




    // Step 6 (#pagebox6) fill in coaching time and studio M/W
 


    $("#pagebox6 .proceed").on("click", function(event) {

        if ($("#pagebox6 input").filter(function() {
                return $.trim($(this).val()).length == 0
            }).length) {
            alert('Please make sure all the fields are filled!');
        } else {
            ////////////////////////////////////////////////
            ////////////////////////////////////////////////
            // MW都填好了


            //先抓#pagebox6裡面那個MW時間
            for (i = 0; i < coachMWTime[1]; i++) {
                coachingMWTimeTable[i] = $("#pagebox6 input.slotTime")[i].value;
            }

            //再來抓那個MW地點
            var slotlist=0; //抓studio的指標
            for (var t=1;t<=coachMWTime[1];t++){ //檢查到底落在1.2.3..哪個時段
                for (var i = 0; i < worksMW.length; i++) {//第i組
                    if (coachMWTime[0][i] == t) { // 如果第i組在第t個時段有rehearsal
                        coachMWStudio[i] = $("#pagebox6 input.studio")[slotlist].value;
                        slotlist++;
                    }
                } //end 檢查所有組
            } // end 檢查所有時段


            //生成pagebox7
            //先生成ul

            for (var k=0;k<coachTTTime[1];k++){     
                var aul=document.createElement("ul"); 
                var atimeslot = document.createElement("h2");
                var thetime=k+1; // change to 1 based not 0 based
                atimeslot.innerText='Time Slot '+thetime;
                var itsplaceholder = document.createElement("input");
                itsplaceholder.classList += "slotTime";
                itsplaceholder.type = "text";
                itsplaceholder.placeholder = "please click here to enter the exact time";
                aul.appendChild(atimeslot);
                aul.appendChild(itsplaceholder);
                $("#pagebox7 .container")[0].appendChild(aul);
            }      

            //再生成ul下面的東西


            for (let i = 0; i < coachTTTime[0].length; i++) {
                var apiece = document.createElement("li");

                var left = document.createElement("div");
                left.classList += "left";
                left.innerHTML = worksTT[i] + ' | ' + groups[works.indexOf(worksTT[i])][0];
                var right = document.createElement("div");
                right.classList += "right";
                right.innerHTML = '<input type="text" class="studio" placeholder="click to enter studio">';
                apiece.appendChild(left);
                apiece.appendChild(right);
                $("#pagebox7 ul")[coachTTTime[0][i] - 1].appendChild(apiece);
            }

            $("#pagebox7 input[type='text']").keydown(function(event) {
                if (event.which == '13' && (/[^\s+$]/.test($(this).val()))) {
                    event.preventDefault();
                    // Grabbing the new student from input
                    $(this).blur();
                }
            });

        $("#pagebox6").remove();
        $("#pagebox7").css("display", "initial");
        }



    });




    // Step 7 (#pagebox7) fill in coaching time and studio T/T

    $("#pagebox7 .proceed").on("click", function(event) {

        if ($("#pagebox7 input").filter(function() {
                return $.trim($(this).val()).length == 0
            }).length) {
            alert('Please make sure all the fields are filled!');
        } else {
            ////////////////////////////////////////////////
            ////////////////////////////////////////////////
            // TT都填好了


            //先抓#pagebox7裡面那個TT時間
            for (let q = 0; q < coachTTTime[1]; q++) {
                coachingTTTimeTable[q] = $("#pagebox7 input.slotTime")[q].value;
            }

            //再來抓那個TT地點
            var slotlist=0; //抓studio的指標
            for (var t=1;t<=coachTTTime[1];t++){ //檢查到底落在1.2.3..哪個時段
                for (var i = 0; i < worksTT.length; i++) {//第i組
                    if (coachTTTime[0][i] == t) { // 如果第i組在第t個時段有rehearsal
                        coachTTStudio[i] = $("#pagebox7 input.studio")[slotlist].value;
                        slotlist++;
                    }
                } //end 檢查所有組
            } // end 檢查所有時段
        }//#pagebox7能抓的都抓了

        // dynamically generate the content of #pagebox8

        $("#pagebox7").remove();
        //make the content for #pagebox8		
        for (let w = 0; w < works.length; w++) {
            var agroup = document.createElement("div");
            var apiece = document.createElement("h2");
            var members = document.createElement("p");
            var coachedBy = document.createElement("p");
            var rehearsalIsAt = document.createElement("p");
            agroup.classList += "group";
            apiece.classList += "piece";



            apiece.textContent = works[w];
            members.textContent = getMembersText(w);
            coachedBy.textContent = getCoachedByText(w);
            rehearsalIsAt.textContent = 'Daily rehearsal: ' + rehearsalTimeTable[rehearsalTime[0][w] - 1] + ' @ ' + rehearsalStudio[w];
            agroup.appendChild(apiece).appendChild(members).appendChild(coachedBy).appendChild(rehearsalIsAt);

            $("#pagebox8")[0].appendChild(agroup);
        }

        function getCoachedByText(i) {
            var str = 'coached by ' + groups[i][0] + ' every ';

            if (coachDays[i] == 'MW') {
                str += 'Mon/Wed ';
                str += coachingMWTimeTable[coachMWTime[0][worksMW.indexOf(works[i])] - 1];
                str += ' @ ';
                str += coachMWStudio[coachMWTime[0][worksMW.indexOf(works[i])] - 1];
            } else {
                str += 'Tue/Thu ';
                str += coachingTTTimeTable[coachTTTime[0][worksTT.indexOf(works[i])] - 1];
                str += ' @ ';
                str += coachTTStudio[coachTTTime[0][worksTT.indexOf(works[i])] - 1];
            }
            return str;
        }

        function getMembersText(i) {
            var str = '';
            for (let j = 1; j < groups[i].length; j++) {
                if (violin.indexOf(groups[i][j]) !== -1) {
                    str += ' violin/ ' + groups[i][j] + ',';
                } else if (viola.indexOf(groups[i][j]) !== -1) {
                    str += ' viola/ ' + groups[i][j] + ',';
                } else if (cello.indexOf(groups[i][j]) !== -1) {
                    str += ' cello/ ' + groups[i][j] + ',';
                } else if (piano.indexOf(groups[i][j]) !== -1) {
                    str += ' piano/ ' + groups[i][j] + ',';
                } else if (bass.indexOf(groups[i][j]) !== -1) {
                    str += ' string bass/ ' + groups[i][j] + ',';
                }
            }
            return str;
        }
        // end making the content for #pagebox8	
        $("#pagebox8").css("display", "initial");
    });




    // Step 8: just a table





    /////////////some spare functions/////////////////



    function arrayUnique(originalArray) {
        var uniqueArray = [];
        for (let i = 0; i < originalArray.length; i++) {
            if (uniqueArray.indexOf(originalArray[i]) == -1) {
                uniqueArray.push(originalArray[i]);
            }
        }
        return uniqueArray;
    }


}); //end document.ready