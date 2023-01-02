let sideSpans = document.querySelectorAll("aside .part span:has(i:nth-of-type(2))");
let nestedSideSpans = document.querySelectorAll(".big > span")
let sideShowBtn = document.querySelector("nav button");
let sideShow = true;
let sideDivs = document.querySelectorAll("aside div");
let tableListParent = document.querySelector(".table-footer ul");
let tableList = document.querySelectorAll(".table-footer li");
let tableSelect = document.querySelector(".table-filtering select");
let tableSearch = document.querySelector(".table-filtering input[type='search']");
let tableRows = document.querySelectorAll("table tr");
let tableCells = document.querySelectorAll("table td");
let tableShowingInfo = document.querySelector(".table-footer span")
console.log(sideShow)
let setTableLength = (start, length = tableSelect.options[tableSelect.selectedIndex].value)=>{
    console.log(tableRows)
    tableRows.forEach((row)=>{
        row.style.display = "none"
    })
    for(i = start + 1;i <= length;i++){
        tableRows[i].style.display = "revert"
    }
    tableShowingInfo.textContent = `Showing ${start + 1} to ${tableSelect.options[tableSelect.selectedIndex].value} of 60 entries`;
    setTableInfo(start + 1 , tableSelect.options[tableSelect.selectedIndex].value)
    createTableLis(1,(tableRows.length) / length, length)
}
let setTableInfo = (start,end) => {
    tableShowingInfo.textContent = `Showing ${start} to ${end} of 60 entries`;
}
let createTableLis = (first = 1, last = 5, shownLength = 10)=>{
    tableListParent.querySelectorAll("li").forEach((li)=>{
        tableListParent.removeChild(li);
    })
    for(i = first ; i <= last; i++){
        let li = document.createElement("li")
        li.classList.add("p-2", "border", "text-primary");
        li.textContent = i;
        li.addEventListener("click",()=>{
            tableListParent.querySelectorAll("li").forEach((li)=>{
                li.classList.remove("active");
            })
            li.classList.add("active")
            tableRows.forEach((row)=>{
                row.style.display = "none"
            })
            for(i = ((li.textContent - 1) * parseInt(shownLength)) + 1;i <= ((((li.textContent - 1) * parseInt(shownLength))) + parseInt(shownLength));i++){
                tableRows[i].style.display = "revert"
                console.log(tableRows[i])
            }   
            setTableInfo(((li.textContent - 1) * parseInt(shownLength)) + 1,((((li.textContent - 1) * parseInt(shownLength))) + parseInt(shownLength)))
        })
        tableListParent.appendChild(li)
    }
}
let searchInTable = (searchedWord)=>{
    // tableRows.forEach((row)=>{
        //     row.style.display = "none";
        // })  
        if(searchedWord === ''){
            let selectedLength = tableSelect.options[tableSelect.selectedIndex].value;
            setTableLength(0, selectedLength);
        }else{
            tableRows.forEach((row, index)=>{
                let show = false;
                row.querySelectorAll("td").forEach((cell)=>{
                    let regStr  = new RegExp(searchedWord,'ig')
                    // cell.textContent.match(regStr)
                    // console.log(cell.textContent.match(regStr))
                    // console.log(regStr.test(cell.textContent))
                    // console.log("TRUE LRNGTH")
                    if(cell.textContent.match(regStr)){
                        show = true;
                    }else{
                        console.log("FALSE")
                    }
                })
                if(show){
                    row.style.display = 'revert';
                }else{
                    row.style.display = 'none';
                }
            })
        }
}

tableList.forEach((li, index)=>{
    li.onclick = ()=>{
        tableList.forEach((li)=>{
            li.classList.remove("active");
        })
        li.classList.add("active");
        setTableLength(index * tableSelect.options[tableSelect.selectedIndex].value, (index + 1) * tableSelect.options[tableSelect.selectedIndex].value)
    }
})
sideSpans.forEach((span,index)=>{
    span.onclick = (e)=>{
        if(span.classList.contains("active")){    
            sideSpans.forEach((span)=>{
                span.classList.remove("active");
            });
        }else{
            sideSpans.forEach((span)=>{
                span.classList.remove("active");
            });
            span.classList.add("active");
        }
    }
});
nestedSideSpans.forEach((span,index)=>{
    span.onclick = (e)=>{
        // sideSpans[1].nextElementSibling.style.cssText = `
        //     // background-color: rgb(123, 123, 142 , 0.2 );
        //     height: 200px;
        // `;
        sideSpans[1].nextElementSibling.classList.add("active");
        if(span.classList.contains("active")){    
            nestedSideSpans.forEach((span)=>{
                span.classList.remove("active");
                sideSpans[1].nextElementSibling.classList.remove("active");
            //     sideSpans[1].nextElementSibling.style.cssText = `
            //     // background-color: rgb(123, 123, 142 , 0.2 );
            //     height: 0px;
            // `;
            });
        }else{
            nestedSideSpans.forEach((span)=>{
                span.classList.remove("active");
            });
            span.classList.add("active");
        }
        if(sideSpans[1].nextElementSibling.classList.contains("active")){
            sideSpans[1].nextElementSibling.style.cssText = `
                height: 200px;
            `;
        }else{
            sideSpans[1].nextElementSibling.style.cssText = `
                height: 80px;
            `;
            sideSpans[1].nextElementSibling.classList.remove("active")
        }
    }
});

sideShowBtn.onclick = ()=>{
    if(sideShow === true){
        sideDivs.forEach((div)=>{
            div.style.cssText = `
                opacity:0;
                transform: translateX(-40px);
            `;
        })
        document.querySelector("aside").style.cssText = `
            transition-duration: 0.3s;
            width: 0;
            padding: 0;
        `;
        sideShow = false;
    }else{
        sideDivs.forEach((div)=>{
            div.style.cssText = `
                opacity:1;
                transform: translateX(0px);
            `;
        })
        document.querySelector("aside").style.cssText = `
            width: 300px !important;
            transition-duration: 0.3s;
            padding: 20px !important;
        `;
        sideShow = true;
    }
}
tableSelect.onchange = ()=>{
    let selectedLength = tableSelect.options[tableSelect.selectedIndex].value;
    setTableLength(0, selectedLength);
}
window.onload = ()=>{
    let selectedLength = tableSelect.options[tableSelect.selectedIndex].value;
    setTableLength(0, selectedLength);
}
tableSearch.onchange = () => {
    searchInTable(tableSearch.value.trim());
}