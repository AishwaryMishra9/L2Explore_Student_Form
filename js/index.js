var token = "90934874|-31949258522326225|90959634";     // Replace with your JPDB token
var dbName = "SCHOOL-DB";
var relName = "STUDENT-TABLE";
var baseURL = "http://api.login2explore.com:5577";

// ---------------------- RESET FORM ----------------------
function resetFormState() {
    document.getElementById("studentForm").reset();

    let fields = ["fullname", "class", "birthdate", "address", "enrollDate"];
    fields.forEach(f => document.getElementById(f).disabled = true);

    document.getElementById("roll").disabled = false;

    document.getElementById("saveBtn").disabled = true;
    document.getElementById("updateBtn").disabled = true;
    document.getElementById("resetBtn").disabled = true;

    document.getElementById("roll").focus();
}

resetFormState();

// ----------------- GET STUDENT BY ROLL NO ----------------
function getStudentByRoll(roll) {

    var getReq = {
        token: token,
        dbName: dbName,
        rel: relName,
        cmd: "GET_BY_KEY",
        jsonStr: { roll: parseInt(roll) }
    };

    return fetch(baseURL + "/api/irl", {
        method: "POST",
        body: JSON.stringify(getReq)
    }).then(res => res.json());
}

// -------------------- SAVE STUDENT ----------------------
function saveStudent(data) {
    var putReq = {
        token: token,
        dbName: dbName,
        rel: relName,
        cmd: "PUT",
        jsonStr: data
    };

    return fetch(baseURL + "/api/iml", {
        method: "POST",
        body: JSON.stringify(putReq)
    }).then(res => res.json());
}

// ------------------- UPDATE STUDENT ---------------------
function updateStudent(data) {
    var updateReq = {
        token: token,
        dbName: dbName,
        rel: relName,
        cmd: "UPDATE",
        jsonStr: data
    };

    return fetch(baseURL + "/api/iml", {
        method: "POST",
        body: JSON.stringify(updateReq)
    }).then(res => res.json());
}

// ------------------- ROLL NO BLUR EVENT ------------------
document.getElementById("roll").addEventListener("blur", async () => {
    let roll = document.getElementById("roll").value;
    if (roll === "") return;

    let fields = ["fullname", "class", "birthdate", "address", "enrollDate"];
    fields.forEach(f => document.getElementById(f).disabled = false);

    document.getElementById("resetBtn").disabled = false;

    let result = await getStudentByRoll(roll);

    if (result.status === 400) {
        // ----------- New Student -----------
        document.getElementById("saveBtn").disabled = false;

    } else {
        // ----------- Existing Student -----------
        let data = result.record;

        document.getElementById("fullname").value = data.fullname;
        document.getElementById("class").value = data.class;
        document.getElementById("birthdate").value = data.birthdate;
        document.getElementById("address").value = data.address;
        document.getElementById("enrollDate").value = data.enrollDate;

        document.getElementById("roll").disabled = true;
        document.getElementById("updateBtn").disabled = false;

        document.getElementById("fullname").focus();
    }
});

// --------------------- SAVE BUTTON -----------------------
document.getElementById("saveBtn").onclick = async () => {
    let data = {
        roll: parseInt(document.getElementById("roll").value),
        fullname: document.getElementById("fullname").value,
        class: document.getElementById("class").value,
        birthdate: document.getElementById("birthdate").value,
        address: document.getElementById("address").value,
        enrollDate: document.getElementById("enrollDate").value
    };

    await saveStudent(data);
    alert("Student Saved Successfully!");
    resetFormState();
};

// --------------------- UPDATE BUTTON ----------------------
document.getElementById("updateBtn").onclick = async () => {
    let data = {
        roll: parseInt(document.getElementById("roll").value),
        fullname: document.getElementById("fullname").value,
        class: document.getElementById("class").value,
        birthdate: document.getElementById("birthdate").value,
        address: document.getElementById("address").value,
        enrollDate: document.getElementById("enrollDate").value
    };

    await updateStudent(data);
    alert("Student Data Updated Successfully!");
    resetFormState();
};

// --------------------- RESET -----------------------------
document.getElementById("resetBtn").onclick = resetFormState;