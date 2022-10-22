import { QuickDB } from 'quick.db';

const db = new QuickDB();
/*
dataform
{
    "1":0,
    "2":0,
    "3":0,
    "4":0,
    "5":0,
    "ip":{}
}
*/

/*
get form
{
    "link":"asdasd"
}

report form
{
    "link":"sadad/sads"
    "report":[0,1,2],
    "ip":""
}
*/

const cleanDataForm = {
    "1":0,
    "2":0,
    "3":0,
    "4":0,
    "5":0,
    "ip":{}
}

export const existData = async (link:string)=>{
    const myData = await db.get(link);

    if(myData == null ||myData == undefined || Object.keys(myData as any).length == 0)
        return false;

    return true;
}

export const addData= async (form:any)=>{
    if(!await existData(form.link)){
        const myDataForm:any = cleanDataForm;
        form.report.split(",").map((e:string)=>{
            myDataForm[e as string] = myDataForm[e] as number +(1/form.report.split(",").length);
        });
        myDataForm["ip"][form.ip as string] = true;

        await db.set(form.link,cleanDataForm);
    }
    else{
        const myDataForm:any = await db.get(form.link) as any;
        if(myDataForm[`ip`][form.ip] != true){
            form.report.split(",").map((e:string)=>{
                myDataForm[e as string] = myDataForm[e] as number +(1/form.report.split(",").length);
            });
        }
        myDataForm["ip"][form.ip as string] = true;

        await db.set(form.link,myDataForm);
    }
}

export const getData= async (link:string)=>{
    const myData = await db.get(link);

    // if not reported
    if(!await existData(link))
        return cleanDataForm;

    return myData;
}