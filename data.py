from datasets import load_dataset
import fasttext

# Step 1: Load the dataset
ds = load_dataset("akshatmehta98/amazon_reviews", split="train")

# Step 2: Prepare training data file for fastText
# fastText expects each line in this format: __label__<label> <text>
with open("train.fasttext.txt", "w", encoding="utf-8") as f:
    for example in ds:
        label = example["labels"].lower()  # Assuming labels field contains 'positive' or 'negative'
        text = example["text"].replace("\n", " ").strip()
        line = f"__label__{label} {text}\n"
        f.write(line)

print("Training data file 'train.fasttext.txt' created.")

# Step 3: Train the supervised fastText model
model = fasttext.train_supervised(
    input="train.fasttext.txt",
    epoch=25,        # number of times to train over the dataset
    lr=1.0,          # learning rate
    wordNgrams=2,    # capture word n-grams (helpful for phrase info)
    verbose=2        # verbosity level for training status
)

# Step 4: Save the trained model
model.save_model("sentimodel.bin")
print("Model trained and saved as 'sentimodel.bin'")
