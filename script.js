function openForm() {
  document.getElementById('formPopup').style.display = "flex";
}

function submitForm() {
  document.getElementById('successBox').style.display = "block";
}

function generatePDF() {
  // load jsPDF
  const script = document.createElement("script");
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
  script.onload = buildPDF;
  document.body.appendChild(script);
}

async function buildPDF() {
  const { jsPDF } = window.jspdf;

  const pdf = new jsPDF({ unit: "pt", format: "a4" });

  // Elegant border
  pdf.addImage("form-border.png", "PNG", 20, 20, 555, 800);

  pdf.setFontSize(14);
  pdf.text("GOVERNMENT PRIMARY SCHOOL PETHGAM WAGOORA", 160, 60);

  let name = document.getElementById("studentName").value;
  let father = document.getElementById("fatherName").value;
  let mother = document.getElementById("motherName").value;
  let dob = document.getElementById("dob").value;
  let contact = document.getElementById("contact").value;

  pdf.text(`Student Name: ${name}`, 50, 140);
  pdf.text(`Father Name: ${father}`, 50, 170);
  pdf.text(`Mother Name: ${mother}`, 50, 200);
  pdf.text(`Date of Birth: ${dob}`, 50, 230);
  pdf.text(`Contact: ${contact}`, 50, 260);

  // Add photo
  let file = document.getElementById("photoUpload").files[0];
  if (file) {
      let reader = new FileReader();
      reader.onload = function(e) {
          pdf.addImage(e.target.result, "JPEG", 400, 120, 120, 150);
          pdf.save("Admission-Form.pdf");
      };
      reader.readAsDataURL(file);
  } else {
      pdf.save("Admission-Form.pdf");
  }
}
