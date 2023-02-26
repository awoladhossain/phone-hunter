// 1:: fetch the korbo the function takey call korbo 

const loadPhone = async (searchText, dataLimit)=>{
    const URL =`https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(URL);
    const data = await res.json();
    displayPhones(data.data, dataLimit); // array of object paici.....
}

// 2:: link anar por oita ke display korbo .. 
const displayPhones = (phones,dataLimit) =>{
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent='';
    // display only 20 phones only
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length>10)
    {
        phones = phones.slice(0,10);
        showAll.classList.remove('d-none');
    }
    else
    {
        showAll.classList.add('d-none');
    }

    //7:: display no phones when we don't found them::: and show the message jar jonno oi id ta ke call korey ante hobe::
    const noPhone =document.getElementById('no-found-message');

    if(phones.length === 0) //phones.length er value jodi 0 or negative number hoi tahole no phone er class ta kaj korbe...
    {
        noPhone.classList.remove('d-none');
    }
    else
    {
        noPhone.classList.add('d-none');
    }

    // display all phones here::::
    phones.forEach((phone)=>{
        const phoneDiv = document.createElement('div');
        
        // console.log(phone) // (console.log korey ami object er modhe entey koray felchi and er modhe .properties nam diay ami dynamic value dita parbo innerhtml er modhe )
        
        phoneDiv.classList.add('col'); //ei div bananor por tar sathe col ekta class add korlam jate korey col wise jini gula hoi,, taiii

        phoneDiv.innerHTML =`
        <div class="card p-4">
                        <img src="${phone.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <p class="card-text">This is a longer card with supporting text below as a natural
                                lead-in to additional content. This content is a little bit longer.</p>
                                  <button onclick="loadePhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button> 
            
                        </div>
                    </div>
        `; //12:: btn-onclick hander dicitaci jate kore click kole baki details show hoii

        phonesContainer.appendChild(phoneDiv); //append child er modhe kohono ("" or ' ') use kora jabe nah.
    });

    // 9:: stop loder ... when all the div appended
    toggoleSpinner(false);
}

const processSearch =(dataLimit)=>
{
     // 9:: start loder start hobe:: 
     toggoleSpinner (true);

     const searchField = document.getElementById('search-field'); // search field we vaule ta amr ana lagbe ei khaney...
     
     const searchText = searchField.value;
     
     // valo ktohah search text tar modhe to value ta ace kintu loadphone funtion ka jodi ei khaney call nah korey jodi khali tar arrgument bosaya dei taile to kaj hobe nah ,, so oi function ta ke call korta hobe ei part er modhe tar por seacrch text ta ka [parameter] hisbe bosaya dei .....
     
     loadPhone(searchText,dataLimit);
 
     // can not read the properties of null value.. ta maney mistake kothay nah kothayo hoicha so amr oita change korta honbe to find  out ..
}

// 3:::ekhn ekta event handler use korbo jate koray click korey phn ta ka search dia bhairr kora jay.....
// handle search btn clicked:: 

document.getElementById('btn-search').addEventListener('click', function()
{
    // 9:: start loder start hobe:: 
    // toggoleSpinner (true);

    // 11:: important part: first appirance koita data dakhbo api thakey eita hoccha oi part ta.. 
    processSearch(10);

    // const searchField = document.getElementById('search-field'); // search field we vaule ta amr ana lagbe ei khaney...
    
    // const searchText = searchField.value;
    
    // valo ktohah search text tar modhe to value ta ace kintu loadphone funtion ka jodi ei khaney call nah korey jodi khali tar arrgument bosaya dei taile to kaj hobe nah ,, so oi function ta ke call korta hobe ei part er modhe tar por seacrch text ta ka [parameter] hisbe bosaya dei .....
    
    // loadPhone(searchText);

    // can not read the properties of null value.. ta maney mistake kothay nah kothayo hoicha so amr oita change korta honbe to find  out ..

})

// 13:: search input filed enter key handler: enter marbo koi bolk:: input field e.. not button e hehehe..jinis choto but valo bhabe bhujta hobe tmre ekhn thakey .. 
document.getElementById('search-field').addEventListener('keypress', function(e)
{
    // console.log(e.key)
    if(e.key == 'Enter')
    {
        processSearch(10);
    }
})


// eita ekta array function start hoilo:: 
const toggoleSpinner = (isLoading) =>{

const loaderSection = document.getElementById('loader');
if(isLoading)
{
    loaderSection.classList.remove('d-none');
}
else{
    loaderSection.classList.add('d-none');
}
    }

// 10: not the best way to do this, but api has some limitations so eita kora lagtace
document.getElementById('btn-show-all').addEventListener('click', function()
{
    processSearch();
    // ei khane kono limit dibo nah.. shob data dakhbao so eitai kono limit dakhbo nah... 


})

// 12:: function ta create korlam jate koray information gula URL thakey data ta paii..
const loadePhoneDetails = async(id)=>{
    const URL = `https://openapi.programming-hero.com/api/phone/${id}`;
     const res = await fetch(URL);
     const data = await res.json();
     displayPhoneDetails(data.data); 
}

const displayPhoneDetails =(phones)=>{
    console.log(phones);

    const modalTitle = document.getElementById('phoneDetailModalLabel'); //from h5
    modalTitle.innerText =phones.name;
    // const modalImage = document.getElementById('modal-image');
    // modalImage.setAttribute('src',"https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-mini.jpg")
    const phoneDetails =document.getElementById('phone-details');
    phoneDetails.innerHTML =`
    <img src="${phones.image}" alt="" >
    <p>Release Date: ${phones.releaseDate ? phones.releaseDate : 'not found'}</p>
    <p>Main Features: ${phones.mainFeatures.chipSet}</p>
    <p>Main Features: ${phones.mainFeatures.storage}</p>
    <p>Main Features: ${phones.mainFeatures.sensors[0]}</p>
    <p>Main Features: ${phones.mainFeatures.sensors[1]}</p>
    <p>Main Features: ${phones.mainFeatures.sensors[2]}</p>
    `;
}

// 4: search fild to dynamic kicu niccha nah so loadPhone er function er URL to dynamic kora lagbe jate korey click btn  clik korle ami jate ja search korchi ta khuja paiiii.. so loadPhone er function er URL to dynamic  ekhn korta hobe.. koira felo... ekhn. er searchText er modhe to value ta ace jai phn er nam dia serach kortaci so serachtext ta ke loadphone er function er parameter hisabe dia dilam and URL er value tao dynamic koira felam jate koray jata chachi oita jate klhuja  pai ami.. 



// 5::: ekhn ekbar serach korer por phone ta show korche but abr jokhn onno kono name search korbo tokhn dakha jache oita nichaya thaktace karon ami to oita append chailid hisbae set koray rakchi ,... tai new name search korer por jate agerr gulao clear hoay jay sey joonoo ki korta hobe chinta koro 2 min::: [phonesContainer.innerHTML///phonesContainer.textContent='';///phonesContainer.innertext='';] eitar value ki korta hobe empty korta hobe tahole new search dile ager gula nai hoay jabe...jahutu phone gula container er modhe ace sheay tu div gula to container modhei hobe.. so ager div gula nai korer jonno ... [phonesContainer.innerHTML///phonesContainer.textContent='';///phonesContainer.innertext='';] er =''; empty koray dao lagbe jate koray new search gula show kore.....er bhul kora jabe eibar... okk..



// 6:: ekhn amr kace onk gula data ace ekhn ami chachi nah ek sathe shob gula dakhite  jar karone ami fetch koreay jai data gula URL thakay pachi takey ami slice korbo then oita show korbo forEach loop er madhome................... so koira felo kaj ta,, tahole kothay kora jay display funnction er modhe.. er nah hoi loadphon er modhe.. but loadphone er modhe korle prlm hocha tokhn shey only slicer data gula dakhabe porer gula anbe nah.. kintu 2nd function er modhe korle first er modhe ami baki gulao load koray show all btn click koray dakhta parbo .. so anrea 2nd function er modhe koira felbo .. koira fel taile........



// 7:: new er ekta jinis try korbo ekhn ta hoilo ami jokhn search bar kicu type korbo oita jodi nah thakey tahole ekta message display ta show korbo jate kore new search dao jay.. so eita kothay korta hobe chinta koro ..... ekhn if condtion er modhe ki korbo oita agey tmr bhujta hobe then baki kaj .... ekhn class thakey ekta call dilam .. d-none manay ki.. d-none maney hocche dakhabo nah.. ekhn ami search dilam and phone pailam nah taile ami ja phn ta pailam nah d-none jai html tag er modhe ace oi class ta ke ami remove koira dibo jate koray[no phone founded plz serach again] msg ta user dakhta pay...

// 8:: no phone founded plz ei msg default dakache cz amre loadPhone function ta call koray rakchi tai oita comment out koray dile ki hobe..ekhn tahole oi ta kintu tao thakey jache .. tahole ekhn ki kora jay chinta koro .. jaita amre bolta ekjon chinta koro.. chintai nah hoi korlam ekhn hehehe..... so jokhn if condtion ta skip korlo tokhn to tar else er kace jao lagbe jate kora dispaly none korer jonno ,, maney search diay phn ta ami pailam ekhn[no phone founded plz serach again ] eita tokhn er show korbe nah.. so else er modhe ekta condition dia dilam er eka classlist add korey... oita ki oitao chinta koro.. hehehe..


// 9:: eibar ektta kaj koira feli.. eibar no chinta kora kaj khoja.. hehehe.. ekhn oita hoilo amra jokhn website entry mari tokhn tokhn data load hoar time ekta spinner kaj kore onakei oita ka loadar o bole .. so eita amre bhujta hobe kon time a ami eita dakhabo.. so eita to all time dakhite pari nah so dakhabo tokhn jokhn ami serach bar kicu type korta thakbo maney eitar ekta start and ekta end point set koray dita hobe..eita ka tokhn ami handle korta parbo .. so ami jokhn seach btn click kortaci tokhoni to seach er kaj start hoccha tai nah.. so oita kaj ta hoite er result show korta jai time lagey oi time tar majhe jai time tuku ami pai tokhn ami spinner ta to dakhbo tai nah.. so data load hoa projonto ami taray dakhabo.. shob gula  div jokhn append hoay jabe tokhn loading ta stop hobe....er ekta kaj sathe ace[jokhn no phone found hobe] tokhn o oita d-none hoay thakbe.. 

// 10:: show all btn er kaj:: show all btn click korle baki joto gula ace oigula dakhbe ekhn eita ki bhbe kora jay ta ekhn ektu bhujta hobe taile shunina nei ki bole then back kortaci hehehe..  but jai process ta kortaci this is not the best way to do this, because amdr API has some limitations jar karone ei bhabe kora lagtace . so future versions aro valo koira korbo ..important part to remmber!!

// 11:  processSearch ekta function create korchi jahutu 2 jaygay eki jinis lakha lagtace so amra ekta function er modhe ta likha 2 jaygay call koray dibo...eita part ta valo bhabe bhujta hobe 

// 12:: ekta onlcik hander bosailam jate koray phoner er details dakha jay.. valo bhabe.. so eita kothay dici innerHTML jai kahney ace oi khaney.. taile er madhome amra ekta phone details dakhta parbo... and ekta fuction created korlam jate koray ei function data supply dita parey.. 


// 13:: search input field enter key event handler::: so kamne korbo chinta kor eibar..  

// 14:: 

// loadPhone();