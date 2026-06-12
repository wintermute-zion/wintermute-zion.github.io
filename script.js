// Taskbar Clock ────────────────────────────────────────────────────────────────────────

function updateTaskbarClock() {
  var currentTime = new Date().toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  });

  const taskbarClock = document.querySelector("#taskbarClock");
  taskbarClock.innerHTML = currentTime;
}

setInterval(updateTaskbarClock, 1000);

// Window Handling ───────────────────────────────────────────────────────────────────────

var taskbar = document.querySelector("#taskbar");
var biggestIndex = 1;
var selectedIcon = undefined;

//Name windows
var welcomeWindow = document.querySelector("#welcome");
var steamWindow = document.querySelector("#steam");

//Initialize named windows
initializeWindow(steamWindow);
initializeWindow(welcomeWindow);

function initializeWindow(element) {
  addWindowClickHandling(element);
  makeCloseable(element);
  makeOpenable(element);
  dragElement(element);
}

// Function (initializeWindow) Child Functions ─────────────────────────────────────────

function addWindowClickHandling(element) {
  element.addEventListener("mousedown", () => handleWindowClick(element));
}

function handleWindowClick(element) {
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  taskbar.style.zIndex = biggestIndex + 1;
  deselectIcon(selectedIcon);
}

function makeCloseable(element) {
  const close = document.querySelector("#" + element.id + "-close");
  if (close) {
    close.addEventListener("click", function () {
      closeWindow(element);
    });
  }
}

function makeOpenable(element) {
  const open = document.querySelector("#" + element.id + "-open");
  if (open) {
    open.addEventListener("click", function () {
      openWindow(element);
    });
  }
}

function dragElement(element) {
  var initalX = 0;
  var initalY = 0;
  var currentX = 0;
  var currentY = 0;

  if (document.getElementById(element.id + "header")) {
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    element.onmousedown = startDragging;
  }

  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();

    initalX = e.clientX;
    initalY = e.clientY;

    document.onmouseup = stopDragging;
    document.onmousemove = moveElement;
  }

  function moveElement(e) {
    e = e || window.event;
    e.preventDefault();

    currentX = initalX - e.clientX;
    currentY = initalY - e.clientY;
    initalX = e.clientX;
    initalY = e.clientY;

    element.style.top = element.offsetTop - currentY + "px";
    element.style.left = element.offsetLeft - currentX + "px";
  }

  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// Function (makeCloseable/makeOpenable) Child Functions ────────────────────────────────

function closeWindow(element) {
  element.style.display = "none";
}

function openWindow(element) {
  element.style.display = "flex";
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  taskbar.style.zIndex = biggestIndex + 1;
}

// Desktop Icon Handling ────────────────────────────────────────────────────────────────

function deselectIcon(element) {
  if (!element) return;
  element.classList.remove("selected");
  selectedIcon = undefined;
}

function handleIconClick(element) {
  if (element.classList.contains("selected")) {
    deselectIcon();
    openWindow(window);
  } else {
    selectIcon();
  }
}

function selectIcon(element) {
  element.classList.add("selected");
  selectedIcon = element;
}
