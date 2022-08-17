const axios = require('axios')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: './output.csv',
  append: true,
  header: [
    {id: 'title', title: 'title'},
    {id: 'section', title: 'section'},
    {id: 'description', title: 'description'},
    
  ]
});
const body = {}
const headers = {
    'authorization': "Token af6b30c38307b85b1965a5cc5de76568c2314b46"
}
const searchData = async (query, pagenum) => {
    const url = `https://api.indiankanoon.org/search/?formInput=${query}&pagenum=${pagenum}`
    try {
        const res = await axios.post(url, body, {
            headers: headers
        })
        console.log("RES", res?.data)
        return res?.data
    } catch (error) {
        console.log('CATCH_ERROR:', error)
    }
}

const getDocDetails = async(docId) => {
    const url = `https://api.indiankanoon.org/doc/${docId}/`
    try {
        const res = await axios.post(url, body, {
            headers: headers
        })
        console.log("RES", res?.data)
        return res?.data
    } catch (error) {
        console.log('CATCH_ERROR:', error)
    }
}

const removeHTMLTags = (data) => {
	return data.replace(/<\/?[^>]+(>|$)/g, "");
}

const cleanTitle = (text) => {
	let section = 'Section';
	let words = text.split(' ');

	let numberIndex = words.findIndex((word) => word == section);
	let nextWord = words[numberIndex + 1];

	return `section ${nextWord}`
}

const entryPoint = async() => {
	//empty docId array 
	const arrayOfDocId = []
	//serach data by query 
	const searchRes = await searchData('section', 10) 
	//store docid from response
	searchRes.docs.map((doc) => (
		//storing docid
		arrayOfDocId.push(doc.tid)
	))
	console.log(arrayOfDocId)
	//loop getdocdetails

	arrayOfDocId.map(async(docId) => { 
		const res = await getDocDetails(docId)
		const title = res?.title
		const section = cleanTitle(res.title)
		const description = removeHTMLTags(res.doc)
		await csvWriter.writeRecords([{title: title,section: section, description: description}])
	})
}

entryPoint()