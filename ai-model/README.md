# AI Model Setup

## Required Files (Not in Git - Too Large)

### 1. Datasets
Download and place in `ai-model/` folder:
- **Fake.csv** (63 MB)
- **True.csv** (54 MB)

Download from: [Kaggle Fake News Dataset](https://www.kaggle.com/datasets/clmentbisaillon/fake-and-real-news-dataset)

### 2. Python Environment
```bash
python -m venv .venv
.venv\Scripts\activate  # Windows
source .venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
```

### 3. Train the Model
```bash
python train_distilbert.py
```

This will create:
- `fake_news_model/` folder with trained model
- `results/` folder with checkpoints

### 4. Run Flask Server
```bash
python app.py
```

## Model Files
After training, you'll have:
- `fake_news_model/model.safetensors` (267 MB)
- `fake_news_model/config.json`
- `fake_news_model/tokenizer_config.json`