import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from wordcloud import WordCloud
import jieba
from collections import Counter
import warnings
import os
warnings.filterwarnings('ignore')
/
├── cover.html              # 系统入口文件
├── sub1_history.html       # 民居对比分析-历史发展
├── sub2_adaptation.html    # 民居对比分析-地域适应
├── sub3_wisdom.html        # 民居对比分析-建筑智慧
├── sub4_culture.html       # 民居对比分析-文化关联
├── sub5_modern.html        # 民居对比分析-现代发展
├── gallery.html            # 典型民居图鉴
└── /assets                 # 静态资源根目录
    ├── /js                 # JavaScript文件目录
    │   ├── gallery.js      # gallery.html配套交互脚本
    │   ├── sub1.js         # sub1_history.html配套交互脚本
    │   ├── sub2.js         # sub2_adaptation.html配套交互脚本
    │   ├── sub3.js         # sub3_wisdom.html配套交互脚本
    │   ├── sub4.js         # sub4_culture.html配套交互脚本
    │   └── sub5.js         # sub5_modern.html配套交互脚本
    ├── /css
    │   └── style.css       # 全局样式文件
    └── /data               # 数据文件（包含原始数据与使用数据）
        ├── galleryData.js  # 图鉴数据文件
        └── /images
            ├── /全景图      # gallery.html使用的全景图
            ├── /文化场景    # gallery.html使用的文化场景图
            ├── /词云图      # gallery.html使用的词云图（由ciyun.py生成）
            ├── /时间轴      # sub1_history.html使用的时间轴配图
            ├── /纹样        # sub3_wisdom.html使用的建筑纹样图
            └── /现代照片    # sub5_modern.html使用的现代民居照片
# 1. 基础设置
plt.rcParams['font.sans-serif'] = ['SimSun', 'Microsoft Yahei']
plt.rcParams['axes.unicode_minus'] = False
excel_path = 'data/词云.xlsx'
save_dir = '词云图/'

# 2. 颜色函数
def get_dark_color_func():
    dark_colors = [
        '#8B4513', '#5C4033', '#6D4C41',
        '#2F4F4F', '#3C3C3C', '#4A4A4A',
    ]
    def color_func(word, font_size, position, orientation, random_state=None, **kwargs):
        # randint 包含上限，所以用 len-1
        return dark_colors[random_state.randint(0, len(dark_colors) - 1)]
    return color_func

# 3. 确保保存文件夹存在
if not os.path.exists(save_dir):
    os.makedirs(save_dir)
    print(f"已创建图片保存文件夹：{save_dir}")

# 4. 数据读取与预处理
df = pd.read_excel(excel_path)
df['民居_填充'] = df['民居'].fillna(method='ffill')
house_types = df['民居_填充'].unique()
print(f"检测到 {len(house_types)} 种民居类型：{list(house_types)}")

# 5. 文本处理
stop_words = set([
    '的', '了', '是', '在', '有', '和', '及', '与', '等', '能', '可', '会', '要', '将', '对', '于', '以', '为', '之',
    '也', '都', '还', '又', '或', '而', '并', '且', '但', '却', '虽', '然', '因', '由', '所', '把', '被', '使', '让',
    '研究', '分析', '探讨', '进行', '开展', '实施', '发展', '建设', '形成', '体现', '具有', '包含', '属于', '作为', '建筑', '文化',
    '四合院', '杨柳青', '民居', '晋派大院', '蒙古包', '口袋房', '苏式', '越派', '徽派', '闽南红砖厝', '赣派', '楚派', 
    '豫西窑洞', '湘派', '镬耳屋', '干栏', '吊脚楼', '川东', '川西', '一颗印', '藏式碉房', '陕北窑洞', '河西走廊土坯房', '唐楼',
    '郑家大屋', '三合院', '耳屋', '林盘', '阿以', '以及', '窑洞', '石库门', '一颗', '庄廓'
])

def process_text(text):
    if pd.isna(text) or text == '':
        return []
    words = jieba.lcut(str(text))
    return [word for word in words if len(word) > 1 and word not in stop_words and not word.isdigit()]

# 6. 词频统计
wordcloud_data = {}
for house_type in house_types:
    house_texts = df[df['民居_填充'] == house_type]['摘要'].tolist()
    all_words = []
    for text in house_texts:
        all_words.extend(process_text(text))
    word_freq = Counter(all_words)
    wordcloud_data[house_type] = dict(word_freq.most_common(50))
    print(f"\n{house_type}：共提取 {len(all_words)} 个关键词，筛选出前50个高频词")

# 7. 批量生成词云图
for house_type, word_freq in wordcloud_data.items():
    # 创建画布时设置透明背景
    fig, ax = plt.subplots(1, 1, figsize=(12, 10), facecolor='none')
    
    # 生成词云
    wc = WordCloud(
        width=1000,
        height=800,
        background_color=None,  # 透明背景
        mode='RGBA',            # 必须设置为RGBA模式才能支持透明
        font_path='C:/Windows/Fonts/msyh.ttc',  # Windows中文字体
        max_words=50,
        relative_scaling=0.8,
        random_state=42,
        contour_width=1.5,
        contour_color='#8B4513',  # 轮廓
        color_func=get_dark_color_func()
    ).generate_from_frequencies(word_freq)
    
    # 显示与保存
    ax.imshow(wc, interpolation='bilinear')
    ax.axis('off')  # 关闭坐标轴
    
    save_path = os.path.join(save_dir, f"{house_type}.png")
    plt.tight_layout()
    # 保存时设置transparent=True确保透明背景生效
    plt.savefig(save_path, dpi=300, bbox_inches='tight', 
                facecolor='none', edgecolor='none', transparent=True)
    plt.close()
    print(f"✅ {house_type} 词云图已保存至：{save_path}")

print(f"\n🎉 所有词云图生成完成！共 {len(house_types)} 张，保存路径：{os.path.abspath(save_dir)}")
