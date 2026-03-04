_default:
    @just --list

# build the site
build:
    npm run build

# start a dev server
start:
    npm run start

# check accessibility (slow)
check-accessibility:
    npm run check:accessibility

# create a new blog post
new-post title="New Post":
    #!/usr/bin/env bash
    slug=$(echo "{{ title }}" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd 'a-z0-9-')
    date=$(date +%Y-%m-%d)
    year=$(date +%Y)
    mkdir -p "src/blog/${year}"
    file="src/blog/${year}/${slug}.md"
    if [ -f "$file" ]; then
        echo "Error: $file already exists"
        exit 1
    fi
    cat > "$file" << EOF
    ---
    title: {{ title }}
    date: ${date}
    ---

    EOF
    echo "Created $file"
