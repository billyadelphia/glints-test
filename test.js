const uu = "Sun - Tues, Weds, Fri 9 am - 10:15 pm";
const days = {
    Mon: 0,
    Tues: 1,
    Weds: 2,
    Thurs: 3,
    Fri: 4,
    Sat: 5,
    Sun: 6,
};
let bb = uu.split(" ");
let index = bb.length - 1;
for (const b of bb.reverse()) {
    if (days[b.replace(",", "").trim()]) {
        break;
    }
    index--;
}
let dayString = "";
let dateString = "";
let index2 = 0;
for (const b3 of bb.reverse()) {
    if (index >= index2) {
        dayString += b3 + " ";
    } else {
        dateString += b3 + " ";
    }
    index2++;
}

const rr = dayString.split(",");
const daysData = [];
for (const r of rr) {
    if (r) {
        if (r.includes("-")) {
            const split = r.split("-");
            for (i = days[split[1].trim()]; i <= days[split[0].trim()]; i++) {
                daysData.push(i);
            }
        } else {
            daysData.push(days[r.trim()])
        }
    }


}
console.log(daysData)

// console.log("dayString", dayString)
// console.log("dateString", dateString);