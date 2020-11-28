function submitcourses()
{
    document.getElementById("result").innerHTML = "";
    var n = document.getElementById("submitid").value;
    
    if (n == '')
    {
        document.getElementById("fieldhtml").innerHTML = "<div class='error'>Please enter the number of courses to proceed</div>";
        return false;
    }
    else if (n <= 0)
    {
        document.getElementById("fieldhtml").innerHTML = "<div class='error'>Number of courses must be greater than 0</div>";
        return false;
    }
    
    var a1 = '<input type="text" class="field infofield" id="';
    var a2 = '" placeholder="Number of credits" /><input type="text" class="field infofield" id="';
    var a3 = '" placeholder="Grade earned" /><br />';
    var html = '<div style="margin-top: 10px;"></div><form autocomplete="off">';
    
    for (var i = 0; i < n; i++)
        html += a1 + 'credit' + i + a2 + 'grade' + i + a3;
    
    
    html += "<button onclick='cgpaCalculate(); return false;' style='margin-top: 15px;'>Calculate</button></form>";
    
    document.getElementById("fieldhtml").innerHTML = html;
}

function cgpaCalculate()
{
    var totalCredit = 0, credit,
        cgpa, gp = 0, temp,
        size = document.getElementById("submitid").value;

    for (var i = 0; i < size; i++)
    {
        if (document.getElementById("credit" + i).value == "" ||
            document.getElementById("grade" + i).value == "")
        {
            showError("Please fill up the fields above");
            return false;
        }
        
        
        credit = parseFloat(document.getElementById("credit" + i).value);
        if (!Number.isInteger(credit) || credit < 0)
        {
            showError("Credits must be non-negative integers");
            return false;
        }
        totalCredit += credit;
        temp = gradePoint(document.getElementById("grade" + i).value);
        if (temp == -1)
        {
            showError("Incorrect grade type");
            return false;
        }
        gp += temp * credit;
    }

    cgpa = gp / totalCredit;

    cgpa = +cgpa.toFixed(2);
    document.getElementById("result").innerHTML = "<div style='margin-top: 10px;'>CGPA = " + cgpa + "</div>";
}

function showError(e)
{
    document.getElementById("result").innerHTML = "<div class='error' style='font-size: 18px; font-weight: normal;'>" + e + "</div>";
}

function gradePoint(g)
{
    if (g == "A" || g == "a") return 4;
    else if (g == "A-" || g == "a-") return 3.7;
    else if (g == "B+" || g == "b+") return 3.3;
    else if (g == "B"  || g == "b" ) return 3;
    else if (g == "B-" || g == "b-") return 2.7;
    else if (g == "C+" || g == "c+") return 2.3;
    else if (g == "C"  || g == "c" ) return 2;
    else if (g == "C-" || g == "c-") return 1.7;
    else if (g == "D+" || g == "d+") return 1.3;
    else if (g == "D"  || g == "d" ) return 1;
    else if (g == "F"  || g == "f" ) return 0;
    else if (g == "O"  || g == "o" ) return 0;
    else return -1;
}
