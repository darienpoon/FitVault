const { Configuration, OpenAIApi } = require("openai");

const db = require('../database/db.js');
const apiKey = process.env.API_KEY;
const configuration = new Configuration({
  apiKey: apiKey,
});


module.exports = {

  addItem: (params) => {

    const values = [
      params.item,
      params.category,
      params.color,
      params.brand,
      params.occasion,
      params.tags,
      params.photos || [],
    ];
    const query = `INSERT INTO closet_items (item, category, color, brand, occasion, tags, photos)
    VALUES ($1, $2, $3, $4, $5, $6, $7)`;

    return db.query(query, values);
  },

  getCloset: () => {
   const query = 'SELECT * FROM closet_items'
  return db.query(query);
  },

  searchCloset: (searched) => {

    const query = `
    SELECT json_agg(json_build_object(
      'id', id,
      'item', item,
      'category', category,
      'color', color,
      'brand', brand,
      'occasion', occasion,
      'tags', tags
    )) as matching_items FROM closet_items
    WHERE
      item ILIKE $1 OR
      category ILIKE $2 OR
      color ILIKE $3 OR
      brand ILIKE $4 OR
      occasion ILIKE $5 OR
      tags ILIKE $6
  `;

  const values = Array(6).fill(`%${searched}%`);

  return db.query(query, values)
    .then((result) => {
      if (result.rows.length === 0 || result.rows[0].matching_items === null) {
        return null;
      } else {
        return result.rows[0].matching_items;
      }
    })
    .catch((error) => {
      throw error;
    });

},

  updateItem: (itemId, params) => {
    const values = [
      params.item,
      params.category,
      params.color,
      params.brand,
      params.occasion,
      params.tags,
      params.photos || [],
      itemId
    ];
    const query = `
    UPDATE closet_items
    SET
      item = $1,
      category = $2,
      color = $3,
      brand = $4,
      occasion = $5,
      tags = $6,
      photos = ARRAY(SELECT DISTINCT unnest($7::text[]))
    WHERE
      id = $8`;

    return db.query(query, values);
  },

  deleteItem: (itemId) => {
    const values = [itemId]

    const query = `DELETE FROM closet_items WHERE id = $1`;

    return db.query(query, values)
  },


  getOutfitSuggestionFromGPT: async (cleanClosetData, message) => {

    try {
      // const prompt = `${message} ClosetData:${closetData} Recs should be based on user provided closetData items`;
      const prompt = `\nMessage: ${message}\nrecommendations should only from the following Closet Data: ${JSON.stringify(cleanClosetData)} do not recommend things not available in provided closetdata. Recommendations should include one top(not jacket, either shirt, sweater, or tee), maybe outerwear (1 outerwear or jacket), bottoms( 1 pants), shoe (1 shoes), and maybe accessories available in closetData. It should include one outerwear, one bottom, and one shoe. Should not say your choice, should pick an option from closet. If asked about what items we have in closet, only describe and respond with whats in the closet that matches the characteristic provided, and do not provide any recommendations`;
      console.log('PROMPT CHECKING', prompt)

      // Create a new OpenAI instance with the configuration
      const openai = new OpenAIApi(configuration);

      // Make the API call using createCompletion method
      const completion = await openai.createCompletion({
        model: "text-davinci-003", // Choose the engine you want to use
        prompt: prompt,
        max_tokens: 2500,
        // stop: ['\n'],
      });

      // Extract the generated response from the API
      const chatResponse = completion.data.choices[0].text.trim();
      return chatResponse;
    } catch (error) {
      console.error('Error while chatting with GPT:', error);
      throw new Error('Failed to get outfit suggestion from GPT');
    }
  },
}