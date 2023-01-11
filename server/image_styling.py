import sys
import tensorflow_hub as hub
import tensorflow as tf
import numpy as np
import cv2

model = hub.load(
    "https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2")


def load_image(img_path):
    img = tf.io.read_file(img_path)
    img = tf.image.decode_image(img, channels=3)
    img = tf.image.convert_image_dtype(img, tf.float32)
    img = img[tf.newaxis, :]
    return img


style_image = load_image(sys.argv[1])
content_image = load_image(sys.argv[2])


stylized_image = model(tf.constant(content_image), tf.constant(style_image))[0]

cv2.imwrite(sys.argv[3], cv2.cvtColor(
    np.squeeze(stylized_image)*255, cv2.COLOR_BGR2RGB))
