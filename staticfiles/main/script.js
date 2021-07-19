
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
                            let offset = hiddenDiv.scrollHeight
                            document.querySelector("#msg_container #loading").remove()
                            container.innerHTML = hiddenDiv.innerHTML + container.innerHTML
                            document.querySelector("#msg_container").scrollTop += offset;
                        }

                    }
                    container.style.scrollBehavior = "auto"
                    setTimeout(wrapper, 0)
                    setTimeout(()=>{container.style.scrollBehavior = 'smooth'},100)
                    setTimeout(()=>{loading = false}, 1500)                    
                }
            }
        },2000)