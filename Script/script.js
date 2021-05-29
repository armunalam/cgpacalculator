window.localStorage.setItem('numOfCoursesGlobal', 0)

function submitCourses() {
    document.querySelector('#result').innerHTML = '';
    let n = document.querySelector('#submitid').value;
    window.localStorage.setItem('numOfCoursesGlobal', n);

    if (n == '') {
        document.querySelector('#fieldhtml').innerHTML = '<div class="error">Please enter the number of courses to proceed</div>';
        return false;
    } else if (n <= 0) {
        document.querySelector('#fieldhtml').innerHTML = '<div class="error">Number of courses must be greater than 0</div>';
        return false;
    }

    let html = '<div style="margin-top: 10px;"></div><form onsubmit="cgpaCalculate(); return false;" autocomplete="off">';

    for (let i = 0; i < n; i++)
        html += `
            <input type="text" class="field infofield" id="credit${i}" placeholder="Number of credits" />
            <input type="text" class="field infofield" id="grade${i}" placeholder="Grade earned" />
            <br id="br${i}" />
        `;
        
    html += `
        <button type="button" title="Delete the last row" onclick="deleteRow(); return false;" style="margin-top: 15px;">
            –
        </button>
        <button type="button" title="Add one row above" onclick="addRow(); return false;" style="margin-top: 15px;">
            +
        </button>
        <button type="submit" onclick="cgpaCalculate(); return false;" style="margin-top: 15px;">
            Calculate
        </button></form>
    `;

    document.querySelector('#fieldhtml').innerHTML = html;
}

function addRow() {
    let lastIndex = parseInt(window.localStorage.getItem('numOfCoursesGlobal'));
    document.querySelector('#submitid').value = lastIndex + 1;

    window.localStorage.setItem('numOfCoursesGlobal', lastIndex + 1);

    let field1 = document.createElement('input');
    field1.type = 'text';
    field1.className = 'field infofield';
    field1.id = `credit${lastIndex}`;
    field1.setAttribute('placeholder', 'Number of credits');

    let field2 = document.createElement('input');
    field2.type = 'text';
    field2.className = 'field infofield';
    field2.id = `grade${lastIndex}`;
    field2.setAttribute('placeholder', 'Grade earned');

    let br = document.createElement('br');
    br.id = `br${lastIndex}`;

    let lastElement = document.querySelector(`#br${lastIndex - 1}`);
    lastElement.after(field1);
    field1.after(field2);
    field2.after(br);
}

function deleteRow() {
    let lastIndex = parseInt(window.localStorage.getItem('numOfCoursesGlobal')) - 1;
    document.querySelector('#submitid').value = lastIndex;

    if (lastIndex === 0) {
        document.querySelector('#submitid').value = 1;
        submitCourses();
        return;
    }

    window.localStorage.setItem('numOfCoursesGlobal', lastIndex);

    document.querySelector(`#credit${lastIndex}`).remove();
    document.querySelector(`#grade${lastIndex}`).remove();
    document.querySelector(`#br${lastIndex}`).remove();
}

function cgpaCalculate() {
    let totalCredit = 0,
        credit,
        cgpa, gp = 0,
        temp,
        size = parseInt(window.localStorage.getItem('numOfCoursesGlobal'));

    for (let i = 0; i < size; i++) {
        if (document.querySelector('#credit' + i).value == '' ||
            document.querySelector('#grade' + i).value == '') {
            showError("Please fill up the fields above");
            return false;
        }

        credit = parseFloat(document.querySelector('#credit' + i).value);
        if (!Number.isInteger(credit) || credit < 0) {
            showError('Credits must be non-negative integers');
            return false;
        }
        totalCredit += credit;
        temp = gradePoint(document.querySelector('#grade' + i).value);
        if (temp == -1) {
            showError('Incorrect grade type');
            return false;
        }
        gp += temp * credit;
    }

    cgpa = gp / totalCredit;

    cgpa = +cgpa.toFixed(2);
    document.querySelector('#result').innerHTML = `<div style='margin-top: 10px;'>CGPA = ${cgpa} </div>`;
}

function showError(e) {
    document.querySelector('#result').innerHTML = `<div class='error' style='font-size: 18px; font-weight: normal;'> ${e} </div>`;
}

function gradePoint(g) {
    if (g == 'A' || g == 'a') return 4;
    else if (g == 'A-' || g == 'a-') return 3.7;
    else if (g == 'B+' || g == 'b+') return 3.3;
    else if (g == 'B' || g == 'b') return 3;
    else if (g == 'B-' || g == 'b-') return 2.7;
    else if (g == 'C+' || g == 'c+') return 2.3;
    else if (g == 'C' || g == 'c') return 2;
    else if (g == 'C-' || g == 'c-') return 1.7;
    else if (g == 'D+' || g == 'd+') return 1.3;
    else if (g == 'D' || g == 'd') return 1;
    else if (g == 'F' || g == 'f') return 0;
    else if (g == 'O' || g == 'o') return 0;
    else return -1;
}