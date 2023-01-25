//task 1
const hideByCSSProperty = () => {
    document.getElementById("hide01").style.display = "none";
}

const hideByJS = () => {
    document.getElementById("hide02").remove();
}

const changeClassName = () => {
    document.getElementById("hide03").className = "hidden";
}
//task 2
const hideTwoWays = () => {
    const element = document.getElementById("hide04");
    element.className = element.className === "hidden" ? "container1" : "hidden";
    document.getElementById("hideBtn1").innerText =
        element.className === "hidden" ? "Show" : "Hide";
}
//task 3
const hideAllBtn = () => {
    Array.from(document.getElementsByClassName("container2")).forEach(
        (element) => {
            element.className = "hidden";
        }
    );
}
//task 4
const setSelector = () => {
    Array.from(
        document.querySelectorAll(document.getElementById("css-selector").value)
    ).forEach((element) => {
        element.className = "hidden";
    });
}
//task 5
const proceedYellowContainer = () => {
    alert("hello");

    const element = document.getElementById("yellow-box");
    element.onclick = () => {
        element.className = "hidden";
    };
}
//task6
const showRedBox = () => {
    document.getElementById("red-box").style.display = "block";
}

const hideRedBox = () => {
    document.getElementById("red-box").style.display = "none";
}
//task 7
const showGreenRect = () => {
    document.getElementById("green-rect").style.display = "block";
}

const hideGreenRect = () => {
    document.getElementById("green-rect").style.display = "none";
}
//task 8
const getImageFromUrl = () => {
    document.getElementById("image-from-internet").src =
        document.getElementById("image-url-textbox").value;
}

//task 9
const getImagesFromWeb = () => {
    let urls = document.getElementById("image-urls-textArea").value.split("\n");
    const storage = document.getElementById("image-storage");
    for (const element of urls) {
        storage.appendChild(createImage(element));
    }
}

const createImage = (url) => {
    let image = document.createElement("img");
    image.className = "image-container";
    image.src = url;
    return image;
}
//task10
onmousemove = (e) => {
    document.getElementById(
        "mouse-coords"
    ).innerText = `X: ${e.clientX} Y: ${e.clientY}`;
};
//task11
addEventListener("load", () => {
    document.getElementById(
        "user-language"
    ).innerText = `Language: ${navigator.language}`;
});
//task12
addEventListener("load", () => {
    const element = document.getElementById("user-location");
    navigator.geolocation.getCurrentPosition(
        (location) => {
            element.innerText = `Lat: ${location.coords.latitude} Long: ${location.coords.longitude}`;
        },
        (err) => (element.innerText = err.message),
        { enableHighAccuracy: true, maximumAge: 0 }
    );
});

//task13
addEventListener("load", () => {
    document.getElementById("local-container").innerText =
        localStorage["localstoraged-value"] || "";
    document.getElementById("cookies-container").innerText =
        getCookieValue("cookied-value") || "";
    document.getElementById("session-container").innerText =
        sessionStorage.getItem("session-value") || "";
});

const localChanged = () => {
    localStorage["localstoraged-value"] =
        document.getElementById("local-container").innerText;
}

const cookieChanged = () => {
    document.cookie = `$cookied-value=${document.getElementById("cookies-container").innerText
        }`;
}
const getCookieValue = (cookie) => {
    return document.cookie
        .match(new RegExp(`\\b${cookie}=([^;]+)`, "g"))
        .join("")
        .split("=")[1];
}
const sessionChanged = () => {
    sessionStorage.setItem(
        "session-value",
        document.getElementById("session-container").innerText
    );
}

const topBtn = document.getElementById("topBtn");
//task14
addEventListener("scroll", () => {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
});
const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};
//task15
const outerClick = (event) => {
    alert(event.target.id == 'inner-container' ? 'inner' : 'outer');
}
//task16
const freeze = () => {
    document.getElementById('freezer').style.display = 'block';
    document.body.style.overflow = "hidden";
}
const unfreeze = () => {
    document.getElementById('freezer').style.display = 'none';
    document.body.style.overflow = "visible";
}
//task17
addEventListener('submit', (event) => {
    event.preventDefault();
})
//task18
const onDragOver = (event) => {
    event.preventDefault();
    document.getElementById('drag-zone').classList.add('drag-zone-over')
}

const onDragLeave = (event) => {
    event.preventDefault();
    console.log('leaved');
    document.getElementById('drag-zone').classList.remove('drag-zone-over')
}