import openai

# optional; defaults to `os.environ['OPENAI_API_KEY']`
openai.api_key = '...'

# all client options can be configured just like the `OpenAI` instantiation counterpart
openai.base_url = "http://localhost:4891/v1"
openai.default_headers = {"x-foo": "true"}

completion = openai.chat.completions.create(
    model="gpt4all-j-v1.3-groovy",
    messages=[
        {
            "role": "user",
            "content": "How do I output all files in a directory using Python?",
        },
    ],
)
print(completion.choices[0].message.content)