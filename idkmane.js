import input from "./input.js"



// Tanulók adatai
const students = [];
const numberOfStudents = parseInt(await input("Hány adatot szeretnél megadni?"))
for (let i = 0; i < numberOfStudents; i++) {
    const name = await input('Név:');
    const email = await input('Email:');
    students.push({ name, email });
}

console.log("A tanulók adatai:");
students.forEach(student => {
    console.log(`Név: ${student.name} E-mail: ${student.email}`);
});


// Órarend
const timetable = [
    { day: "Hétfő", classes: ["Matematika", "Fizika", "Informatika"] },
    { day: "Kedd", classes: ["Angol", "Történelem", "Biológia"] },
    { day: "Szerda", classes: ["Kémia", "Matematika", "Testnevelés"] },
    { day: "Csütörtök", classes: ["Fizika", "Angol", "Földrajz"] },
    { day: "Péntek", classes: ["Irodalom", "Történelem", "Informatika"] },
];



console.log("Heti órarend:");
timetable.forEach(day => {
    console.log(`${day.day}: ${day.classes.join(", ")}`);
});
