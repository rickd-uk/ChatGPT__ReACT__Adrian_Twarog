// 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

import { Configuration, OpenAIApi } from 'openai'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const configuration = new Configuration({
	organization: 'org-LXJ1VqIeTBTLbkCQOfG1mdBf',
	//apiKey: process.env.OPENAI_API_KEY,
	apiKey: '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',
})
const openai = new OpenAIApi(configuration)
//const response = await openai.listEngines()

// Create a simple API that calls the function above

const app = express()
const port = 4001

app.use(bodyParser.json())
app.use(cors())

app.get('/models', async (req, res) => {
	const response = await openai.listEngines()
	console.log(response.data.data)
	res.json({
		models: response.data,
	})
})

app.post('/', async (req, res) => {
	const { message, currentModel } = req.body
	console.log(`MESSAGE  ${message}`)
	const response = await openai.createCompletion({
		model: currentModel,
		prompt: `${message}`,
		max_tokens: 100,
		temperature: 0.5,
	})

	// console.log(response.data.choices[0].text)
	res.json({
		message: response.data.choices[0].text,
		currentModel,
	})
})

app.listen(port, () => {
	console.log(`Server listening on http://localhost at port ${port}`)
})
