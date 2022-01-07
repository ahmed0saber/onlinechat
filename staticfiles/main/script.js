let container = document.querySelector("#msg_container")

        // socket handeling section
        const me = document.getElementById("me").value
        const protocol = window.location.protocol == 'https:' ? 'wss:' : 'ws:'
        const chatSocket = new WebSocket(
            protocol
            +'//'
            + window.location.host
            + '/ws/chat/'
        );

        chatSocket.onmessage = function(e) {
            let will_scroll = true

            if (container.scrollTop < container.scrollHeight - 1000){will_scroll = false}
            
            let wrapper = (e) => {
                const data = JSON.parse(e.data);
                if (data.user == me){
                    container.innerHTML += `
                        <div id="user_div"><p id="user_msg"></p></div>`;
                        container.lastElementChild.firstElementChild.innerText = data.message
                }else{
                    container.innerHTML += `<div><p></p></div>`;
                        container.lastElementChild.firstElementChild.innerText = `${data.user}: ${data.message}`
                }}
            wrapper(e)  // we use a wrapper function to build the dom and not wait untill the whole function to be executed
            
            if (will_scroll){container.scrollTop = container.scrollHeight}
        };

        chatSocket.onclose = function(e) {
            console.error('Chat socket closed unexpectedly');
            
        };

        // the text input
        document.querySelector('#input_area input').focus();
        document.querySelector('#input_area input').onkeyup = function(e) {
            if (e.keyCode === 13) {  // enter, return
                document.querySelector('#input_area button').click();
            }
        };

        // the buttons functions
        document.querySelector('#input_area button').onclick = function(e) {
            const messageInputDom = document.querySelector('#input_area input');
            const message = messageInputDom.value;
            chatSocket.send(JSON.stringify({
                'message': message
            }));
            messageInputDom.value = '';
            messageInputDom.focus()
        }
        
        document.querySelector("#down").onclick = ()=>{
            container.scrollTop = container.scrollHeight
        }

        // to scroll onload 
        container.style.scrollBehavior = 'auto'
        container.scrollTop = container.scrollHeight
        container.style.scrollBehavior = 'smooth'

        // api loading section
        let url = window.location.protocol + '//' + window.location.host + "/api/messages/"
        let counter, loading, allLoaded = null
        setTimeout(()=>{
            container.onscroll =  ()=>{
                if (container.scrollTop < 300 && !loading && !allLoaded){
                    counter = document.querySelectorAll("#msg_container > div").length
                    loading = true
                    let wrapper = async ()=>{
                        let data = await fetch(url + `?counter=${counter}`)
                        data = await data.json()
                        if (data.length == 0){
                            allLoaded = true
                            document.querySelector("#msg_container #loading").innerHTML = "All messages were loaded."
                        }else{
                            let tag = ''
                            for (message of data){
                                if (message.username == me){
                                    tag += `<div id="user_div"><p id="user_msg">${message.content}</p></div>` ;
                                }else{
                                    tag += `<div><p>${message.username}: ${message.content}</p></div>`;
                                }
                            }
                            let hiddenDiv = document.getElementById("hiddenDiv")
                            hiddenDiv.innerHTML = `<h4 id="loading">loading...</h4>` + tag
                            
                            document.querySelector("#msg_container #loading").remove()
                            container.innerHTML = hiddenDiv.innerHTML + container.innerHTML
                            
                        }

                    }
                    container.style.scrollBehavior = "auto"
                    let start = container.scrollHeight
                    let pos1 = container.scrollTop
                    wrapper()
                    let end = container.scrollHeight
                    setTimeout(

                        container.scrollTo(0, pos1 + (end - start)),0
                    )
                    setTimeout(
                        ()=>{
                            container.style.scrollBehavior = 'smooth'}
                        ,500)
                    setTimeout(
                        ()=>{loading = false}
                    , 1500)                    
                }
            }
        },2000)