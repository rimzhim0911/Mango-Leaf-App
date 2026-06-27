import tensorflow as tf
import json
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras import layers, models

IMG_SIZE = 224
BATCH_SIZE = 32

dataset_path = "archive"

train_datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2,
    rotation_range=35,
    zoom_range=0.3,
    horizontal_flip=True,
    shear_range=0.25,
    brightness_range=[0.6,1.4],
    fill_mode="nearest"
)

train_data = train_datagen.flow_from_directory(
    dataset_path,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode="categorical",
    subset="training"
)

with open("class_indices.json","w") as f:
    json.dump(train_data.class_indices,f)

print(train_data.class_indices)

val_data = train_datagen.flow_from_directory(
    dataset_path,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode="categorical",
    subset="validation"
)

base_model = MobileNetV2(
    input_shape=(224,224,3),
    include_top=False,
    weights="imagenet"
)

base_model.trainable=False

model=models.Sequential([
    base_model,
    layers.GlobalAveragePooling2D(),
    layers.BatchNormalization(),
    layers.Dense(128,activation="relu"),
    layers.Dropout(0.3),
    layers.Dense(train_data.num_classes,activation="softmax")
])

model.compile(
    optimizer="adam",
    loss="categorical_crossentropy",
    metrics=["accuracy"]
)

model.summary()

history=model.fit(
    train_data,
    validation_data=val_data,
    epochs=15
)

model.save("mango_leaf_disease_model.keras")

print("Training Accuracy:",history.history["accuracy"][-1])
print("Validation Accuracy:",history.history["val_accuracy"][-1])

print("Model Saved Successfully")