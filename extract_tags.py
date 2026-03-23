#!/usr/bin/env python3
import re
import glob
from collections import Counter

all_tags = []

for filepath in sorted(glob.glob('contents/blog/night-overthinking/*.mdx')):
    if 'index.mdx' in filepath:
        continue
    
    with open(filepath, 'r') as f:
        content = f.read()
        
    # Extract frontmatter
    match = re.search(r'^---\n(.*?)\n---', content, re.DOTALL)
    if match:
        frontmatter = match.group(1)
        
        # Extract tags section - handle both array formats
        # Look for tags: followed by either array syntax or YAML array
        tags_match = re.search(r'tags:\s*\n((?:  - [^\n]+\n)*)|tags:\s*\[(.*?)\]', frontmatter)
        
        if tags_match:
            if tags_match.group(1):
                # YAML array format
                tag_lines = tags_match.group(1).strip().split('\n')
                for line in tag_lines:
                    tag = line.strip('- ').strip().strip('"').strip("'")
                    if tag and not tag.startswith('categories'):
                        all_tags.append(tag)
            elif tags_match.group(2):
                # JSON array format
                tag_str = tags_match.group(2)
                tags = [t.strip().strip('"').strip("'") for t in tag_str.split(',')]
                all_tags.extend([t for t in tags if t and 'categories' not in t])

# Count and sort
tag_counts = Counter(all_tags)
sorted_tags = sorted(tag_counts.items(), key=lambda x: x[1], reverse=True)

print("UNIQUE TAGS BY FREQUENCY")
print("=" * 60)
print(f"{'Rank':<6} {'Count':<8} {'Tag':<45}")
print("=" * 60)

for i, (tag, count) in enumerate(sorted_tags, 1):
    print(f"{i:<6} {count:<8} {tag}")

print("\n" + "=" * 60)
print(f"Total unique tags: {len(sorted_tags)}")
print(f"Total tag occurrences: {sum(count for _, count in sorted_tags)}")
