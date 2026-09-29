from pathlib import Path
import argparse

parser = argparse.ArgumentParser(
    prog="build-simple-index.py",
    description=(
        'Create an "index.md" file in `directory` that simply contains '
        'a series of <h2> relative links to each file in `directory`.'
    )
)
parser.add_argument('directory', type=Path)

directory: Path = vars(parser.parse_args())['directory']
if not directory.is_dir():
    raise ValueError(f'{directory} is not a directory')

index_file = f"# Index of `{directory.name}/`\n\n"
for item in directory.iterdir():
    index_file += f'## [{item.stem}](./{item.name})\n\n'

with open(directory / 'index.md', 'wt') as f:
    f.write(index_file)