const form = document.querySelector("form");
            const log = document.querySelector("#log");

            form.addEventListener("submit", (event) => {
              const data = new FormData(form);
              let output = "";
              for (const entry of data) {
                output = `${output}${entry[0]}=${entry[1]}\r`;
              }
              console.log(output)
            //   window.open('index.html');
            window.location.href="index.html";
            // to open a new html file
            //   log.innerText = output;
               event.preventDefault();
            });
