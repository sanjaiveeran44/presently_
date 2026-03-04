require('dotenv').config();

// Function to get model details
async function getModelDetails(modelName) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/${modelName}?key=${process.env.GEMINI_API_KEY}`,
      { method: 'GET' }
    );
    return await response.json();
  } catch (error) {
    console.error(`Error getting details for ${modelName}:`, error.message);
    return null;
  }
}

async function testGeminiAPI() {
  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ Error: GEMINI_API_KEY is not set in .env file');
    console.log('\nPlease create a .env file in the server directory with:');
    console.log('GEMINI_API_KEY=your_api_key_here\n');
    process.exit(1);
  }

  console.log('🔑 Found GEMINI_API_KEY in .env file');
  
  try {
    console.log('\n🔍 Fetching available models...');
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`,
      { method: 'GET' }
    );
    
    const data = await response.json();
    
    if (data.error) {
      console.error('❌ API Error:', data.error);
      if (data.error.status === 'PERMISSION_DENIED') {
        console.log('\n🔑 The API key appears to be invalid or has insufficient permissions.');
        console.log('Please verify your API key at: https://aistudio.google.com/app/apikey');
      }
      return;
    } 
    
    if (!data.models || data.models.length === 0) {
      console.log('✅ API connection successful, but no models found.');
      return;
    }

    console.log('✅ Successfully connected to Gemini API!');
    
    const textModels = data.models
      .filter(model => 
        model.supportedGenerationMethods?.includes('generateContent') &&
        !model.name.includes('embedding')
      )
      .sort((a, b) => a.name.localeCompare(b.name));

    console.log(`\n📋 Found ${textModels.length} text generation models:`);
    
    for (const [index, model] of textModels.entries()) {
      console.log(`\n${index + 1}. ${model.displayName || model.name}`);
      console.log(`   Model: ${model.name}`);
      console.log(`   Description: ${model.description || 'No description'}`);
      console.log(`   Input Token Limit: ${model.inputTokenLimit || 'N/A'}`);
      console.log(`   Output Token Limit: ${model.outputTokenLimit || 'N/A'}`);
      console.log(`   Supported Methods: ${model.supportedGenerationMethods?.join(', ') || 'N/A'}`);
    }

    const testModels = [
      'gemini-2.0-flash',
      'gemini-2.0-flash-001',
      'gemini-2.0-flash-lite',
      'gemini-2.0-flash-lite-001',
      'gemini-2.5-flash',
      'gemini-2.5-pro'
    ];

    console.log('\n🧪 Testing available models...');
    
    for (const model of testModels) {
      if (textModels.some(m => m.name.includes(model))) {
        console.log(`\n🔍 Testing model: ${model}`);
        try {
          await testTextGeneration(model);
          console.log(`✅ Successfully tested ${model}`);
          break; 
        } catch (error) {
          console.log(`❌ ${model} failed: ${error.message}`);
          if (error.message.includes('quota')) {
            console.log('   This model is out of quota. Trying next model...');
            continue;
          }
        }
      }
    }
  } catch (error) {
    console.error('❌ Error testing Gemini API:', error.message);
    if (error.code === 'ENOTFOUND') {
      console.log('\n🌐 Network error: Could not connect to the Gemini API.');
      console.log('Please check your internet connection.');
    }
  }
}

async function testTextGeneration() {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: 'Hello, Gemini! Please respond with a very short test message to confirm the API is working.'
            }]
          }]
        })
      }
    );
    
    const data = await response.json();
    
    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.log('\n🤖 Gemini Response:');
      console.log(data.candidates[0].content.parts[0].text);
      console.log('\n✅ Text generation test successful!');
    } else {
      console.log('\n❌ Unexpected response format:');
      console.log(JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error('Error testing text generation:', error);
  }
}

testGeminiAPI();
